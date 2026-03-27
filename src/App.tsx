/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Timeline from "./components/Timeline";
import CouponGrid from "./components/CouponGrid";
import SecretPage from "./pages/Secret";
import MagicPage from "./pages/Magic";
import GreetingCard from "./pages/GreetingCard";
import { Heart, Gift, Mail } from "lucide-react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <header classname="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Back to Greeting Card Button */}
        <motion.div initial="{{" opacity:="" 0,="" scale:="" 0.8="" }}="" animate="{{" opacity:="" 1,="" scale:="" 1="" }}="" transition="{{" delay:="" 1.2,="" type:="" "spring"="" }}="" classname="absolute top-6 left-6 z-50">
          <script type='text/javascript' nonce='m26De+dvQYv2oln92XXSGQ==' src='https://aistudio.google.com/Ldck-lmPJYYV1OVotFcZz9rPe2WIAP31dQqScqVnjrZm-eLM41Es28XLqjRlutdLC-hv--xd4g4fI0XT3BzRI45E3321t6i5XRUNn9bbiW4-OQSa6XAsYnhT6GvQzobwSZye3sn4DA7GKq588NOcoK5E_TMD5cj1O7bqB4iz9lsH8OpRwTK9J11uRA0dQ8WMOyCu7rzUYbv94AIFVlaUDLMmBBtYF398B9jpQVbHYkdNUC5mx94zn_rU9f-Pbz4rXpvyPJ8aMpjumOYzpMZ52-vxuUwBRoD4kTaBN5K5ua1onQU7Jg6hs-EW18tcSyMiZnGjkHxHRnhFxojzqabbT3Cd3VLtWdGe9SSzj9kNzh8lvWB0EGJw6i1tm3TKYqjd6-qm0Ns7fFhEVYI7KkB2cy1Fpi1GABNXaYulSvxSB7-LD_JCSjK_gVUYW3zD6zw1I_7nGRGM2Y80HqxuAVm1DfGrpI2Cbp4wI1OxvoZuCFvSLR1hW4TSix9P44COEb5ftJ2J4j_M-I-ippDVxeHznDRf4IPJxVMyp2bgAb5Wr3dun7--uqPUL2z9MvQh5wjRdVaErTEN4IiRWZ4YyUSidiXW8NZnM91nmWMNZEANNeqK6MXy6Q'></script><link to="/" classname="group flex items-center gap-2 text-rose-500 bg-white/60 hover:bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-rose-200 transition-all duration-300">
            <mail size="{16}" classname="group-hover:-rotate-12 transition-transform"/>
            <span classname="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Biglietto</span>
          </Link>
        </motion.div>

        <motion.div initial="{{" opacity:="" 0,="" scale:="" 0.95="" }}="" animate="{{" opacity:="" 1,="" scale:="" 1="" }}="" transition="{{" duration:="" 1,="" ease:="" "easeout"="" }}="" classname="z-10">
          <motion.div initial="{{" opacity:="" 0,="" y:="" -10="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" delay:="" 0.5="" }}="" classname="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 backdrop-blur-sm text-rose-600 text-[11px] font-bold uppercase tracking-[0.3em] mb-8 shadow-sm border border-white/50">
            <heart size="{12}" fill="currentColor"/>
            Per Te
          </motion.div>
          <h1 classname="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-6">
            30 Anni di <br/>
            <span classname="text-rose-500 italic font-serif">Morbidezza</span>
          </h1>
          <p classname="mt-8 text-slate-500 max-w-xs mx-auto text-lg font-medium leading-relaxed opacity-80">
            Un viaggio attraverso i nostri momenti più belli, dedicato a te.
          </p>
          
          <motion.div initial="{{" opacity:="" 0="" }}="" animate="{{" opacity:="" 1="" }}="" transition="{{" delay:="" 0.8,="" duration:="" 0.8="" }}="" classname="mt-16">
            <div classname="animate-bounce text-rose-200">
              <p classname="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-60">Inizia il viaggio</p>
              <div classname="w-px h-16 bg-gradient-to-b from-rose-300 to-transparent mx-auto"/>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div classname="absolute top-1/4 -left-12 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl"/>
        <div classname="absolute bottom-1/4 -right-12 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"/>
      </header>

      <main>
        {/* Section 1: Timeline */}
        <section classname="bg-white rounded-t-[3rem] -mt-12 relative z-20 shadow-2xl">
          <div classname="py-20 text-center">
            <h2 classname="text-3xl font-bold text-slate-900">I Nostri Ricordi</h2>
            <p classname="text-slate-500 mt-2">Un viaggio attraverso i momenti più belli</p>
          </div>
          <timeline/>
        </section>
      </main>
    </>
  );
}

function CouponsPage() {
  return (
    <main classname="bg-pink-50 min-h-screen">
      {/* Gift Page Header */}
      <header classname="relative h-[60vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-white rounded-b-[4rem] shadow-xl">
        <motion.div initial="{{" opacity:="" 0,="" y:="" 30="" }}="" animate="{{" opacity:="" 1,="" y:="" 0="" }}="" transition="{{" duration:="" 1="" }}="" classname="z-10">
          <div classname="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-50 text-rose-500 text-[11px] font-bold uppercase tracking-[0.3em] mb-8 shadow-sm border border-rose-100">
            <gift size="{14}"/>
            Sorpresa
          </div>
          <h1 classname="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9] mb-6">
            I Tuoi <br/>
            <span classname="text-rose-500 italic font-serif">Regali</span>
          </h1>
          <p classname="mt-8 text-slate-500 max-w-xs mx-auto text-lg font-medium leading-relaxed opacity-80">
            Scegli il tuo coupon e riscattalo quando vuoi.
          </p>
          
          <motion.div initial="{{" opacity:="" 0="" }}="" animate="{{" opacity:="" 1="" }}="" transition="{{" delay:="" 0.6,="" duration:="" 0.8="" }}="" classname="mt-12">
            <div classname="animate-bounce text-rose-200">
              <p classname="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-60">Scorri per vedere</p>
              <div classname="w-px h-12 bg-gradient-to-b from-rose-300 to-transparent mx-auto"/>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div classname="absolute top-1/4 -left-12 w-64 h-64 bg-rose-100/40 rounded-full blur-3xl"/>
        <div classname="absolute bottom-1/4 -right-12 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl"/>
      </header>

      <div classname="py-20">
        <coupongrid/>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <browserrouter>
      <scrolltotop/>
      <div classname="min-h-screen bg-pink-50 font-sans selection:bg-rose-200 selection:text-rose-900">
        <routes>
          <route path="/" element="{&lt;GreetingCard"/>} />
          <route path="/journey" element="{&lt;HomePage"/>} />
          <route path="/coupons" element="{&lt;CouponsPage"/>} />
          <route path="/secret" element="{&lt;SecretPage"/>} />
          <route path="/magic" element="{&lt;MagicPage"/>} />
        </Routes>

        <footer classname="py-12 text-center text-slate-400 text-sm border-t border-rose-100">
          <p>Fatto con ❤️ per il tuo compleanno speciale</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
