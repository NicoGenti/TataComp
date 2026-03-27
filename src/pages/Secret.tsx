import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";

const FUNNY_PHOTOS = [
  { id: 1, url: "/images/imgSecret/1.jpg", caption: "Dormigliona 1 😪" },
  { id: 2, url: "/images/imgSecret/2.jpg", caption: "Dormigliona 2 😪" },
  { id: 3, url: "/images/imgSecret/3.jpg", caption: "Dormigliona 3 😪" },
  { id: 4, url: "/images/imgSecret/4.jpg", caption: "Tata gamer 🎮" },
  { id: 5, url: "/images/imgSecret/5.jpg", caption: "Dormigliona 4 😪" },
  { id: 6, url: "/images/imgSecret/6.jpg", caption: "La bellezza 1 🌟" },
  { id: 7, url: "/images/imgSecret/7.jpg", caption: "La bellezza 2 🌟" },
  { id: 8, url: "/images/imgSecret/8.jpg", caption: "Dormigliona 5 😪" },
  { id: 9, url: "/images/imgSecret/9.jpg", caption: "La bellezza 3 🌟" },
  { id: 10, url: "/images/imgSecret/10.jpg", caption: "Dormigliona 6 😪" },
  { id: 11, url: "/images/imgSecret/11.jpg", caption: "Dormigliona 7 😪" },
  { id: 12, url: "/images/imgSecret/12.jpg", caption: "Dormigliona 8 😪" },
  { id: 13, url: "/images/imgSecret/13.jpg", caption: "Dormigliona 9 😪" },
  { id: 14, url: "/images/imgSecret/14.jpg", caption: "La bellezza 4 🌟" },
  { id: 15, url: "/images/imgSecret/15.jpg", caption: "La bellezza 5 🌟" },
  { id: 16, url: "/images/imgSecret/16.jpg", caption: "La bellezza 6 🌟" },
  { id: 17, url: "/images/imgSecret/17.jpg", caption: "Dormigliona 10 😪" },
  { id: 18, url: "/images/imgSecret/18.jpg", caption: "Va a funghi 🍄‍🟫" },
  { id: 19, url: "/images/imgSecret/19.jpg", caption: "La bellezza 7 🌟" },
  { id: 20, url: "/images/imgSecret/20.jpg", caption: "Qui carta canta 💍" },
  { id: 21, url: "/images/imgSecret/21.jpg", caption: "Tartaruga Ninja 🐢" },
  { id: 999, url: "/images/imgSecret/999.jpg", caption: "La miglior foto al mondo! 🤪" },
];

export default function SecretPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/coupons")}
          className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-widest mb-12 hover:text-rose-300 transition-colors"
        >
          <ArrowLeft size={16} />
          Torna ai Regali
        </motion.button>

        <header className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-rose-500 rounded-full mb-6 shadow-lg shadow-rose-500/20"
          >
            <Camera size={32} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-4"
          >
            Area <span className="text-rose-500">Segreta</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Ecco le foto che non avresti mai voluto vedere... ma che io amo! 😂
          </motion.p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {FUNNY_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-800 border border-slate-700 shadow-xl"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="font-bold text-sm tracking-wide">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center p-12 rounded-[3rem] bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <p className="text-xl font-medium italic text-slate-300">
            "Sei bellissima anche quando fai le facce buffe. Ti amo!"
          </p>
        </motion.div>
      </div>
    </div>
  );
}
