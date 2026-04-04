import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Petal {
  id: number;
  x: number;
  delay: number;
}

interface Flower {
  id: number;
  cx: number;
  cy: number;
  scale: number;
  opacity: number;
  petalColor: string;
  centerColor: string;
  stemColor: string;
  petalCount: number;
  rotation: number;
  swayDelay: number;
  zLayer: number;
}

const GATHER_Y = 370;

const FLOWERS: Flower[] = [
  // Back row (zLayer 0) — smaller, dimmer
  { id: 0,  cx: 250, cy: 118, scale: 0.80, opacity: 0.72, petalColor: "#f9a8d4", centerColor: "#fde68a", stemColor: "#4ade80", petalCount: 8,  rotation: 0,   swayDelay: 0.9, zLayer: 0 },
  { id: 1,  cx: 175, cy: 138, scale: 0.75, opacity: 0.70, petalColor: "#c084fc", centerColor: "#fef08a", stemColor: "#86efac", petalCount: 7,  rotation: -10, swayDelay: 1.2, zLayer: 0 },
  { id: 2,  cx: 325, cy: 138, scale: 0.75, opacity: 0.70, petalColor: "#a78bfa", centerColor: "#fde68a", stemColor: "#4ade80", petalCount: 6,  rotation: 10,  swayDelay: 0.6, zLayer: 0 },
  { id: 3,  cx: 128, cy: 168, scale: 0.70, opacity: 0.68, petalColor: "#e879f9", centerColor: "#fef3c7", stemColor: "#86efac", petalCount: 5,  rotation: -22, swayDelay: 1.5, zLayer: 0 },
  { id: 4,  cx: 372, cy: 168, scale: 0.70, opacity: 0.68, petalColor: "#fbbf24", centerColor: "#92400e", stemColor: "#4ade80", petalCount: 12, rotation: 22,  swayDelay: 1.8, zLayer: 0 },
  // Mid row (zLayer 1)
  { id: 5,  cx: 208, cy: 185, scale: 0.90, opacity: 0.85, petalColor: "#fb7185", centerColor: "#fef08a", stemColor: "#4ade80", petalCount: 8,  rotation: -8,  swayDelay: 0.4, zLayer: 1 },
  { id: 6,  cx: 292, cy: 185, scale: 0.90, opacity: 0.85, petalColor: "#f472b6", centerColor: "#fef08a", stemColor: "#86efac", petalCount: 8,  rotation: 8,   swayDelay: 0.7, zLayer: 1 },
  // Front row (zLayer 2) — larger, full opacity
  { id: 7,  cx: 163, cy: 215, scale: 1.00, opacity: 1.00, petalColor: "#fda4af", centerColor: "#fef3c7", stemColor: "#86efac", petalCount: 6,  rotation: -18, swayDelay: 0.3, zLayer: 2 },
  { id: 8,  cx: 250, cy: 205, scale: 1.30, opacity: 1.00, petalColor: "#fb7185", centerColor: "#fef08a", stemColor: "#4ade80", petalCount: 8,  rotation: 0,   swayDelay: 0.0, zLayer: 2 },
  { id: 9,  cx: 337, cy: 215, scale: 1.00, opacity: 1.00, petalColor: "#c084fc", centerColor: "#fef08a", stemColor: "#4ade80", petalCount: 7,  rotation: 18,  swayDelay: 0.6, zLayer: 2 },
];

const SORTED_FLOWERS = [...FLOWERS].sort((a, b) => a.zLayer - b.zLayer);

const GREENERY = [
  { cx: 148, cy: 150, angle: -55, color: "#4ade80" },
  { cx: 352, cy: 150, angle: 55,  color: "#22c55e" },
  { cx: 108, cy: 195, angle: -70, color: "#86efac" },
  { cx: 392, cy: 195, angle: 70,  color: "#4ade80" },
  { cx: 250, cy: 105, angle: -5,  color: "#22c55e" },
];

function GreenerySprig({ cx, cy, angle, color }: { cx: number; cy: number; angle: number; color: string }) {
  return (
    <g transform={`rotate(${angle}, ${cx}, ${cy})`}>
      <path
        d={`M ${cx} ${cy} Q ${cx - 18} ${cy - 28} ${cx} ${cy - 52} Q ${cx + 18} ${cy - 28} ${cx} ${cy}`}
        fill={color}
        opacity={0.75}
      />
      <path
        d={`M ${cx} ${cy - 20} Q ${cx - 22} ${cy - 34} ${cx - 8} ${cy - 44}`}
        fill={color}
        opacity={0.55}
      />
    </g>
  );
}

function FlowerStemOnly({ flower }: { flower: Flower }) {
  const cpX = flower.cx * 0.55 + 250 * 0.45;
  const cpY = (GATHER_Y + flower.cy) / 2;
  return (
    <>
      <path
        d={`M 250 ${GATHER_Y} Q ${cpX} ${cpY} ${flower.cx} ${flower.cy + 16}`}
        stroke={flower.stemColor}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx={flower.cx - 10} cy={flower.cy + 32}
        rx={10} ry={5}
        fill={flower.stemColor}
        opacity={0.85}
        transform={`rotate(-35, ${flower.cx - 10}, ${flower.cy + 32})`}
      />
      <ellipse
        cx={flower.cx + 10} cy={flower.cy + 50}
        rx={10} ry={5}
        fill={flower.stemColor}
        opacity={0.85}
        transform={`rotate(35, ${flower.cx + 10}, ${flower.cy + 50})`}
      />
    </>
  );
}

function FlowerHeadOnly({ flower, isHovered, onClick }: { flower: Flower; isHovered: boolean; onClick: () => void }) {
  const r = 28;
  const petalW = 14;
  const petalH = 22;

  return (
    <motion.g
      style={{ transformOrigin: `${flower.cx}px ${GATHER_Y}px`, opacity: flower.opacity }}
      animate={{ rotate: [flower.rotation - 2, flower.rotation + 2, flower.rotation - 2] }}
      transition={{ duration: 3 + flower.swayDelay, repeat: Infinity, ease: "easeInOut", delay: flower.swayDelay }}
      onClick={onClick}
    >
      {Array.from({ length: flower.petalCount }).map((_, i) => {
        const angle = (360 / flower.petalCount) * i;
        return (
          <motion.ellipse
            key={i}
            cx={flower.cx}
            cy={flower.cy}
            rx={petalW}
            ry={petalH}
            fill={flower.petalColor}
            opacity={0.85}
            style={{ transformOrigin: `${flower.cx}px ${flower.cy}px` }}
            animate={isHovered
              ? { rotate: angle, scaleY: 1.25, scaleX: 1.1 }
              : { rotate: angle, scaleY: 1, scaleX: 1 }
            }
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
        );
      })}
      <motion.circle
        cx={flower.cx}
        cy={flower.cy}
        r={r / 2.5}
        fill={flower.centerColor}
        animate={isHovered ? { r: r / 2, scale: 1.15 } : { r: r / 2.5, scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </motion.g>
  );
}

export default function FlowersPage() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [fallingPetals, setFallingPetals] = useState<Petal[]>([]);
  const [petalCounter, setPetalCounter] = useState(0);

  const handleFlowerClick = (flower: Flower) => {
    setClickedId(flower.id);
    setTimeout(() => setClickedId(null), 600);

    const xPercent = (flower.cx / 500) * 100;
    const newPetals: Petal[] = Array.from({ length: 5 }, (_, i) => ({
      id: petalCounter + i,
      x: xPercent,
      delay: i * 0.1,
    }));
    setPetalCounter((c) => c + 5);
    setFallingPetals((prev) => [...prev, ...newPetals]);
    setTimeout(() => {
      setFallingPetals((prev) => prev.filter((p) => !newPetals.find((n) => n.id === p.id)));
    }, 2500);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #fce7f3 0%, #fff1f2 45%, #fef9c3 100%)" }}
    >
      {/* Soft blur glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{ top: "20%", left: "25%", width: 380, height: 380, background: "rgba(251,113,133,0.16)", filter: "blur(100px)" }}
        />
        <div
          className="absolute rounded-full"
          style={{ top: "28%", right: "20%", width: 300, height: 300, background: "rgba(192,132,252,0.14)", filter: "blur(90px)" }}
        />
      </div>

      {/* Ambient floating petals background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-4 opacity-20"
            style={{
              background: ["#fb7185", "#f9a8d4", "#c084fc", "#fbbf24"][i % 4],
              left: `${(i * 8.5) % 100}%`,
              top: "-5%",
              borderRadius: "50% 50% 50% 0",
              rotate: `${i * 30}deg`,
            }}
            animate={{ y: ["0vh", "110vh"], x: [0, (i % 2 === 0 ? 30 : -30)], rotate: [i * 30, i * 30 + 180] }}
            transition={{
              duration: 8 + (i % 4),
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.7,
            }}
          />
        ))}
      </div>

      {/* Click-triggered falling petals */}
      <AnimatePresence>
        {fallingPetals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute w-4 h-5 pointer-events-none"
            style={{
              left: `${petal.x}%`,
              top: "30%",
              background: "#fb7185",
              borderRadius: "50% 50% 50% 0",
              rotate: "45deg",
            }}
            initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            animate={{ opacity: 0, y: 300, x: (Math.random() - 0.5) * 150, scale: 0.3, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, delay: petal.delay, ease: "easeIn" }}
          />
        ))}
      </AnimatePresence>

      {/* Back button */}
      <div className="relative z-10 pt-8 pl-6">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate("/coupons")}
          className="flex items-center gap-2 text-rose-500 font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Torna ai Coupon
        </motion.button>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center pt-6 pb-2 px-6"
      >
        <h1
          className="font-serif italic text-4xl md:text-5xl font-black tracking-tight text-rose-600"
          style={{ textShadow: "0 2px 24px rgba(251,113,133,0.28)" }}
        >
          Un mazzo di Fiori per te 💐
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-rose-400 mt-3 font-medium tracking-wide text-sm uppercase"
        >
          Clicca su un fiore per farlo sbocciare ✨
        </motion.p>
      </motion.div>

      {/* Bouquet SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 w-full flex justify-center"
        style={{ height: "68vh", minHeight: 460 }}
      >
        <svg
          viewBox="0 0 500 520"
          className="h-full w-auto max-w-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="wrapGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fce7f3" />
              <stop offset="50%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>
            <linearGradient id="wrapShadow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#be185d" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#be185d" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ribbonGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>

          {/* Layer 1: Greenery sprigs */}
          <g>
            {GREENERY.map((g, i) => (
              <GreenerySprig key={i} {...g} />
            ))}
          </g>

          {/* Layer 2: All stems */}
          <g>
            {SORTED_FLOWERS.map((flower) => (
              <FlowerStemOnly key={flower.id} flower={flower} />
            ))}
          </g>

          {/* Layer 3: Bouquet wrap (florist paper cone) */}
          <motion.g
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            style={{ transformOrigin: "250px 295px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {/* Main wrap body */}
            <path
              d="M 108 295 L 392 295 L 294 468 Q 250 482 206 468 Z"
              fill="url(#wrapGradient)"
              opacity={0.92}
            />
            {/* Left fold shadow */}
            <path
              d="M 108 295 L 182 295 L 234 468 Q 250 482 206 468 Z"
              fill="url(#wrapShadow)"
              opacity={0.35}
            />
            {/* Right fold highlight */}
            <path
              d="M 392 295 L 322 295 L 270 470 Q 250 484 294 470 Z"
              fill="#f9a8d4"
              opacity={0.22}
            />
            {/* Center crease line */}
            <path
              d="M 250 295 L 250 470"
              fill="none"
              stroke="#f472b6"
              opacity={0.18}
              strokeWidth={1}
            />
            {/* Decorative scalloped top edge */}
            <path
              d="M 108 295 Q 133 285 158 295 Q 183 285 208 295 Q 233 285 258 295 Q 283 285 308 295 Q 333 285 358 295 Q 375 290 392 295"
              fill="none"
              stroke="#f472b6"
              strokeWidth="2"
              opacity={0.55}
            />
          </motion.g>

          {/* Layer 4: Flower heads (back to front) */}
          {SORTED_FLOWERS.map((flower) => (
            <motion.g
              key={flower.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: flower.opacity, scale: flower.scale }}
              transition={{ delay: 0.2 + flower.id * 0.10, type: "spring", stiffness: 180, damping: 14 }}
              style={{ transformOrigin: `${flower.cx}px ${flower.cy}px`, cursor: "pointer" }}
              onHoverStart={() => setHoveredId(flower.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              {clickedId === flower.id ? (
                <motion.g
                  animate={{ x: [0, -6, 6, -4, 4, 0] }}
                  transition={{ duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                >
                  <FlowerHeadOnly flower={flower} isHovered={hoveredId === flower.id} onClick={() => handleFlowerClick(flower)} />
                </motion.g>
              ) : (
                <FlowerHeadOnly flower={flower} isHovered={hoveredId === flower.id} onClick={() => handleFlowerClick(flower)} />
              )}
            </motion.g>
          ))}

          {/* Layer 5: Bow and ribbon */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ transformOrigin: "250px 372px" }}
            transition={{ delay: 1.2, type: "spring", stiffness: 160, damping: 14 }}
          >
            {/* Ribbon tails */}
            <path
              d="M 240 374 Q 212 404 198 450"
              stroke="url(#ribbonGradient)" strokeWidth="7" fill="none" strokeLinecap="round"
            />
            <path
              d="M 260 374 Q 288 404 302 450"
              stroke="url(#ribbonGradient)" strokeWidth="7" fill="none" strokeLinecap="round"
            />
            {/* Left bow loop */}
            <path
              d="M 250 372 Q 196 336 166 358 Q 154 375 176 383 Q 206 394 250 376 Z"
              fill="#fb7185"
              opacity={0.92}
            />
            <path
              d="M 250 372 Q 210 352 188 362 Q 180 370 188 376 Q 214 385 250 376 Z"
              fill="#e11d48"
              opacity={0.30}
            />
            <path
              d="M 250 372 Q 215 346 192 358 Q 186 364 194 368 Q 218 360 250 372 Z"
              fill="white"
              opacity={0.18}
            />
            {/* Right bow loop */}
            <path
              d="M 250 372 Q 304 336 334 358 Q 346 375 324 383 Q 294 394 250 376 Z"
              fill="#fb7185"
              opacity={0.92}
            />
            <path
              d="M 250 372 Q 290 352 312 362 Q 320 370 312 376 Q 286 385 250 376 Z"
              fill="#e11d48"
              opacity={0.30}
            />
            <path
              d="M 250 372 Q 285 346 308 358 Q 314 364 306 368 Q 282 360 250 372 Z"
              fill="white"
              opacity={0.18}
            />
            {/* Knot */}
            <ellipse cx="250" cy="374" rx="19" ry="13" fill="#e11d48" />
            <ellipse cx="250" cy="374" rx="8" ry="5" fill="#fb7185" opacity={0.6} />
          </motion.g>
        </svg>
      </motion.div>

      {/* Message card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="relative z-10 mx-auto max-w-md px-6 pb-16 text-center"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-rose-100/60 shadow-xl shadow-rose-200/30 p-8 relative">
          <span className="absolute top-3 left-4 text-rose-300 text-lg select-none">🌸</span>
          <span className="absolute top-3 right-4 text-rose-300 text-lg select-none">🌸</span>
          <p className="font-serif italic text-slate-600 text-lg font-medium leading-relaxed">
            Ti meriti un bellissimo mazzo di fiori,<br />scelto con tutto il mio amore. 🌸
          </p>
          <p className="text-rose-400 text-sm mt-5 font-bold tracking-widest uppercase">Con amore ❤️</p>
        </div>
      </motion.div>
    </div>
  );
}
