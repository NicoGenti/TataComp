import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { MEMORIES } from "../constants";
import { Calendar } from "lucide-react";

export default function Timeline() {
  const navigate = useNavigate();

  return (
    <div classname="relative container mx-auto px-4 md:px-6 py-16">
      {/* Vertical Line with Gradient */}
      <div classname="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-transparent via-rose-200 to-transparent opacity-50"/>

      <div classname="space-y-16 md:space-y-32">
        {MEMORIES.map((memory, index) => (
          <motion.div key="{memory.id}" initial="{{" opacity:="" 0,="" y:="" 40="" }}="" whileinview="{{" opacity:="" 1,="" y:="" 0="" }}="" viewport="{{" once:="" true,="" margin:="" "-100px"="" }}="" transition="{{" duration:="" 0.8,="" ease:="" "easeout"="" }}="" classname="{`relative" flex="" items-center="" justify-between="" w-full="" ${="" index="" %="" 2="==" 0="" ?="" "md:flex-row-reverse"="" :="" "flex-row"="" }="" flex-col="" md:flex-row`}="">
            {/* Dot on line with Pulse Effect */}
            <div classname="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-10">
              <div classname="relative">
                <div classname="w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-md"/>
                <motion.div animate="{{" scale:="" [1,="" 1.5,="" 1],="" opacity:="" [0.5,="" 0,="" 0.5]="" }}="" transition="{{" duration:="" 2,="" repeat:="" infinity="" }}="" classname="absolute inset-0 w-4 h-4 rounded-full bg-rose-400 -z-10"/>
              </div>
            </div>

            {/* Content Card - Premium Glassmorphism Style */}
            <div classname="w-full md:w-[45%] pl-12 md:pl-0">
              <motion.div whilehover="{{" y:="" -5="" }}="" classname="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 relative overflow-hidden group">
                {/* Decorative background shape */}
                <div classname="absolute -top-12 -right-12 w-24 h-24 bg-rose-50 rounded-full blur-2xl group-hover:bg-rose-100 transition-colors duration-500"/>
                
                <div classname="flex items-center gap-2 mb-3">
                  <calendar size="{14}" classname="text-rose-400"/>
                  <span classname="text-[11px] font-bold text-rose-400 uppercase tracking-[0.2em]">
                    {memory.date}
                  </span>
                </div>

                <h3 classname="text-2xl font-bold text-slate-900 leading-tight mb-3">
                  {memory.title}
                </h3>
                
                <p classname="text-base text-slate-600 leading-relaxed font-medium opacity-90 mb-5">
                  {memory.description}
                </p>

                <div classname="relative overflow-hidden rounded-2xl aspect-[16/10] shadow-inner bg-slate-100">
                  <img src="{memory.image}" alt="{memory.title}" classname="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerpolicy="no-referrer"/>
                  {/* Subtle overlay */}
                  <div classname="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"/>
                </div>
              </motion.div>
            </div>

            {/* Spacer for the other side on desktop */}
            <div classname="hidden md:block md:w-[45%]"/>
          </motion.div>
        ))}
      </div>

      {/* Birthday Message - Enhanced Design */}
      <motion.div initial="{{" opacity:="" 0,="" y:="" 40="" }}="" whileinview="{{" opacity:="" 1,="" y:="" 0="" }}="" viewport="{{" once:="" true="" }}="" classname="mt-40 text-center relative">
        <div classname="absolute inset-0 bg-rose-100/30 blur-3xl rounded-full -z-10"/>
        <div classname="bg-white/60 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-200/20 max-w-2xl mx-auto">
          <motion.div animate="{{" rotate:="" [0,="" 10,="" -10,="" 0]="" }}="" transition="{{" duration:="" 4,="" repeat:="" infinity="" }}="" classname="text-5xl mb-6 inline-block">
            🎂
          </motion.div>
          <h2 classname="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            I tuoi <span classname="text-rose-500">30 anni</span>
          </h2>
          <p classname="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
            Sei la prova che la vita diventa solo più bella con il tempo. 
            Grazie per ogni sorriso, ogni abbraccio e ogni momento condiviso. 
            Ti amo immensamente.
          </p>
          <motion.button whilehover="{{" scale:="" 1.05,="" boxshadow:="" "0="" 20px="" 40px="" rgba(244,="" 63,="" 94,="" 0.2)"="" }}="" whiletap="{{" scale:="" 0.95="" }}="" onclick="{()" ==""> navigate("/coupons")}
            className="bg-rose-500 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-rose-500/30 hover:bg-rose-600 transition-all"
          >
            Scopri i tuoi Regali 🎁
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
