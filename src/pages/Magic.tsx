import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wand2, Sparkles, Star } from "lucide-react";
import { MAGIC_PHOTOS } from "../constants";

export default function MagicPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-amber-100 py-20 px-6 relative overflow-hidden font-serif">
      {/* Magical background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />

        {/* Floating stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-300/30"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 600),
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            <Star size={10} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/coupons")}
          className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-widest mb-12 hover:text-amber-300 transition-colors font-sans"
        >
          <ArrowLeft size={16} />
          Torna ai Regali
        </motion.button>

        <header className="text-center mb-20">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mb-8 shadow-[0_0_40px_rgba(251,191,36,0.3)] text-slate-900"
          >
            <Wand2 size={40} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black tracking-wider mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200"
          >
            La Stanza delle <br className="md:hidden" />
            <span className="italic">Necessità</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-amber-200/70 text-xl max-w-2xl mx-auto italic"
          >
            "Non serve la magia per trasformare il mondo. Abbiamo già dentro di noi tutto il potere che ci serve."
          </motion.p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MAGIC_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1 * (index % 10), duration: 0.5 }}
              whileHover={{ scale: 1.03, rotateY: 5, boxShadow: "0 20px 40px -10px rgba(251, 191, 36, 0.2)" }}
              className="group relative aspect-[3/4] rounded-sm overflow-hidden bg-slate-800 border-8 border-slate-900 shadow-2xl"
              style={{ transformPerspective: 1000 }}
            >
              {/* Magical frame effect */}
              <div className="absolute inset-0 border border-amber-500/30 z-20 pointer-events-none m-2" />
              <div className="absolute inset-0 border border-amber-500/10 z-20 pointer-events-none m-3" />

              <img
                src={photo.url}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 sepia-[0.2]"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-10">
                <Sparkles className="text-amber-400 mb-2" size={20} />
                <p className="font-bold text-lg tracking-wide text-amber-100 font-serif">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center p-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/20 to-transparent" />
          <div className="relative z-10">
            <Sparkles className="mx-auto text-amber-500 mb-6" size={32} />
            <p className="text-2xl md:text-3xl font-medium italic text-amber-200/90 leading-relaxed">
              "Dopo tutto questo tempo?"<br />
              <span className="text-amber-400 font-bold mt-4 block">"Sempre."</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
