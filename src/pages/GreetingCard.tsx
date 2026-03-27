import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Heart, MailOpen } from "lucide-react";

export default function GreetingCard() {
  const navigate = useNavigate();

  return (
    <div classname="min-h-screen bg-pink-100 flex items-center justify-center p-6 overflow-hidden">
      {/* Background decorations */}
      <div classname="absolute top-10 left-10 w-32 h-32 bg-rose-200/50 rounded-full blur-2xl"/>
      <div classname="absolute bottom-10 right-10 w-48 h-48 bg-pink-300/40 rounded-full blur-3xl"/>
      
      <motion.div initial="{{" y:="" 50,="" opacity:="" 0,="" rotatex:="" -15="" }}="" animate="{{" y:="" 0,="" opacity:="" 1,="" rotatex:="" 0="" }}="" transition="{{" duration:="" 1,="" type:="" "spring",="" bounce:="" 0.4="" }}="" classname="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-rose-100" style="{{" perspective:="" 1000="" }}="">
        {/* Envelope flap design */}
        <div classname="absolute top-0 left-0 w-full h-32 bg-rose-50 border-b border-rose-100" style="{{" clippath:="" "polygon(0="" 0,="" 100%="" 0,="" 50%="" 100%)"="" }}=""/>
        
        <div classname="relative z-10 p-10 pt-20 text-center flex flex-col items-center">
          <motion.div initial="{{" scale:="" 0="" }}="" animate="{{" scale:="" 1="" }}="" transition="{{" delay:="" 0.5,="" type:="" "spring"="" }}="" classname="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6 text-rose-500 shadow-inner">
            <heart size="{32}" fill="currentColor"/>
          </motion.div>
          
          <motion.h1 initial="{{" opacity:="" 0,="" y:="" 10="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 0.7="" }}="" classname="text-3xl font-serif font-bold text-slate-800 mb-4">
            Buon Compleanno Amore mio Bellissimo!
          </motion.h1>
          
          <motion.p initial="{{" opacity:="" 0="" }}="" animate="{{" opacity:="" 1="" }}="" transition="{{" delay:="" 0.9="" }}="" classname="text-slate-600 mb-10 leading-relaxed">
            C'è una sorpresa speciale che ti aspetta. Un viaggio attraverso i nostri ricordi più belli e qualche regalo magico.
          </motion.p>
          
          <motion.button initial="{{" opacity:="" 0,="" y:="" 20="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 1.1="" }}="" whilehover="{{" scale:="" 1.05="" }}="" whiletap="{{" scale:="" 0.95="" }}="" onclick="{()" ==""> navigate("/journey")}
            className="flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition-colors"
          >
            <mailopen size="{20}"/>
            Apri il Biglietto
          </motion.button>
        </div>
        
        {/* Decorative corner flowers/patterns could go here */}
        <div classname="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300"/>
      </motion.div>
    </div>
  );
}
