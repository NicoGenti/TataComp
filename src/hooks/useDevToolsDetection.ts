import { useEffect } from "react";

/**
 * Detects if DevTools is open using multiple heuristics:
 *
 * 1. Window size delta: When DevTools is docked (bottom/side), the inner
 *    viewport shrinks while outer dimensions stay the same.
 *
 * 2. console.log toString trick: A custom object with a getter fires when
 *    DevTools evaluates it in the console (undock detection).
 *
 * When DevTools is detected open, `onOpen` is called.
 * When DevTools is closed again, `onClose` is called.
 *
 * IMPORTANT: This is a best-effort heuristic, not a guaranteed block.
 * It works for most casual users. A determined expert can bypass it.
 */
export function useDevToolsDetection(onOpen: () => void, onClose: () => void) {
  useEffect(() => {
    let isOpen = false;

    // --- Heuristic 1: Window size delta ---
    const THRESHOLD = 160; // px — typical DevTools panel minimum size

    const checkSizeDelta = () => {
      const widthDelta = window.outerWidth - window.innerWidth;
      const heightDelta = window.outerHeight - window.innerHeight;
      return widthDelta > THRESHOLD || heightDelta > THRESHOLD;
    };

    // --- Heuristic 2: console.log getter trick ---
    // When DevTools is open and the console tab is active, it evaluates
    // objects logged to console, triggering the getter.
    let devtoolsOpenViaConsole = false;

    const devtoolsChecker = new Proxy(
      {},
      {
        get(_target, prop) {
          if (prop === "toString" || prop === Symbol.toPrimitive) {
            devtoolsOpenViaConsole = true;
          }
          return "";
        },
      }
    );

    // Poll for size changes
    const interval = setInterval(() => {
      // Trigger the console getter trick passively
      // (calling console.log here would spam the console; instead we check the flag)
      const openNow = checkSizeDelta() || devtoolsOpenViaConsole;

      if (openNow && !isOpen) {
        isOpen = true;
        onOpen();
      } else if (!openNow && isOpen) {
        isOpen = false;
        onClose();
      }
    }, 500);

    // Trigger the getter trick once per interval via a console.log that doesn't
    // visibly spam (only runs once, not every 500ms)
    try {
      // This will trigger the getter if DevTools console is evaluating it
      console.log("%c", devtoolsChecker);
    } catch {
      // ignore
    }

    return () => {
      clearInterval(interval);
    };
  }, [onOpen, onClose]);
}
