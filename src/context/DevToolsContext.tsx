import React, { createContext, useContext, useState, useCallback } from "react";
import { useDevToolsDetection } from "../hooks/useDevToolsDetection";

interface DevToolsContextValue {
  isDevToolsOpen: boolean;
}

const DevToolsContext = createContext<DevToolsContextValue>({ isDevToolsOpen: false });

export function useDevToolsContext() {
  return useContext(DevToolsContext);
}

/**
 * Provides DevTools open/close state to the entire component tree.
 * Wrap around App content (inside HashRouter) so all ProtectedImage
 * instances can react to DevTools being opened.
 */
export function DevToolsProvider({ children }: { children: React.ReactNode }) {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsDevToolsOpen(true), []);
  const handleClose = useCallback(() => setIsDevToolsOpen(false), []);

  useDevToolsDetection(handleOpen, handleClose);

  return (
    <DevToolsContext.Provider value={{ isDevToolsOpen }}>
      {children}
    </DevToolsContext.Provider>
  );
}
