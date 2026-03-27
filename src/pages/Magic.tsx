import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wand2, Sparkles, Star } from "lucide-react";

const MAGIC_PHOTOS = [
  { id: 1, url: "/images/imgBeauty/20231229_125838000_iOS.jpg", caption: "Incanto 1 ✨" },
  { id: 2, url: "/images/imgBeauty/20231229_125840000_iOS.jpg", caption: "Incanto 2 ✨" },
  { id: 3, url: "/images/imgBeauty/20231229_125841000_iOS.jpg", caption: "Incanto 3 ✨" },
  { id: 4, url: "/images/imgBeauty/20240122_131524076_iOS.jpg", caption: "Magia pura 🪄" },
  { id: 5, url: "/images/imgBeauty/20240123_150736396_iOS.jpg", caption: "Lumos! 💡" },
  { id: 6, url: "/images/imgBeauty/20240129_203123417_iOS.jpg", caption: "Incanto 4 ✨" },
  { id: 7, url: "/images/imgBeauty/20240313_214533348_iOS.jpg", caption: "Incanto 5 ✨" },
  { id: 8, url: "/images/imgBeauty/20240401_150106952_iOS.jpg", caption: "Incanto 6 ✨" },
  { id: 9, url: "/images/imgBeauty/20240616_160317012_iOS.jpg", caption: "Magia pura 🪄" },
  { id: 10, url: "/images/imgBeauty/20240809_122416601_iOS.jpg", caption: "Incanto 7 ✨" },
  { id: 11, url: "/images/imgBeauty/20240909_120845000_iOS 2.jpg", caption: "Incanto 8 ✨" },
  { id: 12, url: "/images/imgBeauty/20240921_191617000_iOS.jpg", caption: "Incanto 9 ✨" },
  { id: 13, url: "/images/imgBeauty/20241005_175139965_iOS.jpg", caption: "Incanto 10 ✨" },
  { id: 14, url: "/images/imgBeauty/20250401_114542555_iOS.jpg", caption: "Magia pura 🪄" },
  { id: 15, url: "/images/imgBeauty/20250404_194924983_iOS.jpg", caption: "Incanto 11 ✨" },
  { id: 16, url: "/images/imgBeauty/20250404_195338249_iOS.jpg", caption: "Incanto 12 ✨" },
  { id: 17, url: "/images/imgBeauty/20250406_120946977_iOS.jpg", caption: "Incanto 13 ✨" },
  { id: 18, url: "/images/imgBeauty/20250517_121645396_iOS.jpg", caption: "Incanto 14 ✨" },
  { id: 19, url: "/images/imgBeauty/20250713_001540000_iOS.jpg", caption: "Incanto 15 ✨" },
  { id: 20, url: "/images/imgBeauty/20250713_161119389_iOS.jpg", caption: "Incanto 16 ✨" },
  { id: 21, url: "/images/imgBeauty/20251019_141407522_iOS.jpg", caption: "Incanto 17 ✨" },
  { id: 22, url: "/images/imgBeauty/20251023_205227581_iOS.jpg", caption: "Incanto 18 ✨" },
  { id: 23, url: "/images/imgBeauty/20251110_184132509_iOS.jpg", caption: "Incanto 19 ✨" },
  { id: 24, url: "/images/imgBeauty/20251225_150309880_iOS.jpg", caption: "Magia del Natale 🎄" },
  { id: 25, url: "/images/imgBeauty/20260118_131944475_iOS.jpg", caption: "Incanto 20 ✨" },
  { id: 26, url: "/images/imgBeauty/20260205_170437156_iOS.jpg", caption: "Incanto 21 ✨" },
  { id: 27, url: "/images/imgBeauty/20260307_192939861_iOS.jpg", caption: "Incanto 22 ✨" },
  { id: 28, url: "/images/imgBeauty/20260315_132540914_iOS.jpg", caption: "La strega più bella 🧙‍♀️" },
];

export default function MagicPage() {
  const navigate = useNavigate();

  return (
    <div classname="min-h-screen bg-[#0f172a] text-amber-100 py-20 px-6 relative overflow-hidden font-serif">
      {/* Magical background elements */}
      <div classname="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div classname="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px]"/>
        <div classname="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"/>
        
        {/* Floating stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div key="{i}" classname="absolute text-amber-300/30" initial="{{" x:="" math.random()="" *="" window.innerwidth,="" y:="" math.random()="" *="" window.innerheight,="" scale:="" math.random()="" *="" 0.5="" +="" 0.5="" }}="" animate="{{" y:="" [null,="" math.random()="" *="" -100="" -="" 50],="" opacity:="" [0,="" 1,="" 0]="" }}="" transition="{{" duration:="" math.random()="" *="" 5="" +="" 5,="" repeat:="" infinity,="" ease:="" "linear",="" delay:="" math.random()="" *="" 5="" }}="">
            <star size="{10}" fill="currentColor"/>
          </motion.div>
        ))}
      </div>

      <div classname="container mx-auto max-w-5xl relative z-10">
        <motion.button initial="{{" opacity:="" 0,="" x:="" -20="" }}="" animate="{{" opacity:="" 1,="" x:="" 0="" }}="" onclick="{()" ==""> navigate("/coupons")}
          className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-widest mb-12 hover:text-amber-300 transition-colors font-sans"
        >
          <arrowleft size="{16}"/>
          Torna ai Regali
        </motion.button>

        <header classname="text-center mb-20">
          <motion.div initial="{{" scale:="" 0,="" rotate:="" -180="" }}="" animate="{{" scale:="" 1,="" rotate:="" 0="" }}="" transition="{{" type:="" "spring",="" stiffness:="" 200,="" damping:="" 20="" }}="" classname="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mb-8 shadow-[0_0_40px_rgba(251,191,36,0.3)] text-slate-900">
            <wand2 size="{40}"/>
          </motion.div>
          <motion.h1 initial="{{" opacity:="" 0,="" y:="" 20="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 0.2="" }}="" classname="text-5xl md:text-7xl font-black tracking-wider mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            La Stanza delle <br classname="md:hidden"/>
            <span classname="italic">Necessità</span>
          </motion.h1>
          <motion.p initial="{{" opacity:="" 0="" }}="" animate="{{" opacity:="" 1="" }}="" transition="{{" delay:="" 0.4="" }}="" classname="text-amber-200/70 text-xl max-w-2xl mx-auto italic">
            "Non serve la magia per trasformare il mondo. Abbiamo già dentro di noi tutto il potere che ci serve."
          </motion.p>
        </header>

        <div classname="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MAGIC_PHOTOS.map((photo, index) => (
            <motion.div key="{photo.id}" initial="{{" opacity:="" 0,="" scale:="" 0.9,="" y:="" 30="" }}="" animate="{{" opacity:="" 1,="" scale:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 0.1="" *="" (index="" %="" 10),="" duration:="" 0.5="" }}="" whilehover="{{" scale:="" 1.03,="" rotatey:="" 5,="" boxshadow:="" "0="" 20px="" 40px="" -10px="" rgba(251,="" 191,="" 36,="" 0.2)"="" }}="" classname="group relative aspect-[3/4] rounded-sm overflow-hidden bg-slate-800 border-8 border-slate-900 shadow-2xl" style="{{" transformperspective:="" 1000="" }}="">
              {/* Magical frame effect */}
              <div classname="absolute inset-0 border border-amber-500/30 z-20 pointer-events-none m-2"/>
              <div classname="absolute inset-0 border border-amber-500/10 z-20 pointer-events-none m-3"/>
              
              <img src="{photo.url}" alt="{photo.caption}" classname="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 sepia-[0.2]" referrerpolicy="no-referrer"/>
              
              <div classname="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-10">
                <sparkles classname="text-amber-400 mb-2" size="{20}"/>
                <p classname="font-bold text-lg tracking-wide text-amber-100 font-serif">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial="{{" opacity:="" 0,="" y:="" 30="" }}="" whileinview="{{" opacity:="" 1,="" y:="" 0="" }}="" viewport="{{" once:="" true="" }}="" classname="mt-32 text-center p-16 relative">
          <div classname="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/20 to-transparent"/>
          <div classname="relative z-10">
            <sparkles classname="mx-auto text-amber-500 mb-6" size="{32}"/>
            <p classname="text-2xl md:text-3xl font-medium italic text-amber-200/90 leading-relaxed">
              "Dopo tutto questo tempo?"<br/>
              <span classname="text-amber-400 font-bold mt-4 block">"Sempre."</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
