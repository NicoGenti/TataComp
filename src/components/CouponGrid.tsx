import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { COUPONS } from "../constants";
import { CheckCircle2, Gift, ArrowLeft, Star } from "lucide-react";

export default function CouponGrid() {
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [showHyperspace, setShowHyperspace] = useState(false);
  const [showMagic, setShowMagic] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("redeemed_coupons");
    if (saved) {
      setRedeemed(JSON.parse(saved));
    }
  }, []);

  const handleRedeem = async (couponId: string, couponName: string) => {
    if (redeemed.includes(couponId)) return;

    if (couponId === "grogu-force") {
      setShowHyperspace(true);
      setTimeout(() => {
        navigate("/secret");
      }, 2500);
      return;
    }

    if (couponId === "harry-potter") {
      setShowMagic(true);
      setTimeout(() => {
        navigate("/magic");
      }, 2500);
      return;
    }

    setLoading(couponId);
    try {
      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      if (token && chatId) {
        const text = `🎉 La tua ragazza ha appena riscattato il coupon: ${couponName}!`;
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
        await fetch(url, { method: "POST" });
      }

      const newRedeemed = [...redeemed, couponId];
      setRedeemed(newRedeemed);
      localStorage.setItem("redeemed_coupons", JSON.stringify(newRedeemed));
    } catch (error) {
      console.error("Redeem error:", error);
      // Still mark as redeemed even if notification fails
      const newRedeemed = [...redeemed, couponId];
      setRedeemed(newRedeemed);
      localStorage.setItem("redeemed_coupons", JSON.stringify(newRedeemed));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div id="coupons" className="container mx-auto px-6">
      <AnimatePresence>
        {showHyperspace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.2, 2.5], opacity: [0, 1, 1], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 2.5, times: [0, 0.4, 1], ease: "easeInOut" }}
              className="w-full h-full relative flex items-center justify-center"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/iperspazio.jpg`}
                alt="Hyperspace"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute text-center z-10"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
                Salto nell'Iperspazio!
              </h2>
              <p className="text-rose-400 font-bold mt-4 tracking-[0.5em] uppercase text-sm">
                Tenetevi forte...
              </p>
            </motion.div>
          </motion.div>
        )}

        {showMagic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-slate-900 flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: [0.8, 1.2, 1], opacity: [0, 1, 1], rotate: [-10, 5, 0] }}
              transition={{ duration: 2, times: [0, 0.6, 1], ease: "easeOut" }}
              className="absolute text-center z-10 flex flex-col items-center"
            >
              <div className="text-8xl mb-6">⚡</div>
              <h2 className="text-4xl md:text-6xl font-serif text-amber-400 italic tracking-wider">
                Alohomora!
              </h2>
              <p className="text-amber-200/80 font-medium mt-4 tracking-[0.3em] uppercase text-sm">
                Sblocco la magia...
              </p>
            </motion.div>

            {/* Magical sparkles background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-slate-900 to-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-12">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate("/journey")}
          className="flex items-center gap-2 text-rose-500 font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Torna ai Ricordi
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {COUPONS.map((coupon, index) => {
          const isRedeemed = redeemed.includes(coupon.id);
          const isLoading = loading === coupon.id;

          return (
            <motion.div
              key={coupon.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.15, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-[2.5rem] border transition-all duration-700 ${
                isRedeemed
                  ? "bg-slate-50 border-slate-200 grayscale opacity-60"
                  : "bg-white border-rose-100 shadow-[0_20px_50px_rgba(244,63,94,0.08)] hover:shadow-[0_30px_60px_rgba(244,63,94,0.12)]"
              }`}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-8">
                  <div className={`text-5xl p-4 rounded-3xl ${isRedeemed ? "bg-slate-100" : "bg-rose-50"}`}>
                    {coupon.icon}
                  </div>
                  {isRedeemed && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-slate-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]"
                    >
                      USATO
                    </motion.span>
                  )}
                </div>

                <h3 className={`text-2xl font-black tracking-tight ${isRedeemed ? "text-slate-400" : "text-slate-900"}`}>
                  {coupon.title}
                </h3>
                <p className={`mt-3 text-base font-medium leading-relaxed ${isRedeemed ? "text-slate-400" : "text-slate-500"}`}>
                  {coupon.description}
                </p>

                <div className="mt-10 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${isRedeemed ? "bg-slate-200" : "bg-rose-100"}`} />
                    ))}
                  </div>

                  <motion.button
                    whileHover={!isRedeemed ? { scale: 1.05 } : {}}
                    whileTap={!isRedeemed ? { scale: 0.95 } : {}}
                    disabled={isRedeemed || isLoading}
                    onClick={() => handleRedeem(coupon.id, coupon.title)}
                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all shadow-lg ${
                      isRedeemed
                        ? "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
                        : "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20 active:shadow-none"
                    }`}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isRedeemed ? (
                      <>
                        <CheckCircle2 size={18} />
                        Riscattato
                      </>
                    ) : (
                      <>
                        <Gift size={18} />
                        Riscatta
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Ticket perforation effect */}
              <div className="absolute top-1/2 -left-4 w-8 h-8 bg-pink-50 rounded-full transform -translate-y-1/2 border border-rose-100" />
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-pink-50 rounded-full transform -translate-y-1/2 border border-rose-100" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
