/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
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
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Back to Greeting Card Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="absolute top-6 left-6 z-50"
        >
          <Link
            to="/"
            className="group flex items-center gap-2 text-rose-500 bg-white/60 hover:bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-rose-200 transition-all duration-300"
          >
            <Mail size={16} className="group-hover:-rotate-12 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Biglietto</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 backdrop-blur-sm text-rose-600 text-[11px] font-bold uppercase tracking-[0.3em] mb-8 shadow-sm border border-white/50"
          >
            <Heart size={12} fill="currentColor" />
            Per Te
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-6">
            30 Anni di <br />
            <span className="text-rose-500 italic font-serif">Morbidezza</span>
          </h1>
          <p className="mt-8 text-slate-500 max-w-xs mx-auto text-lg font-medium leading-relaxed opacity-80">
            Un viaggio attraverso i nostri momenti più belli, dedicato a te.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16"
          >
            <div className="animate-bounce text-rose-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-60">Inizia il viaggio</p>
              <div className="w-px h-16 bg-gradient-to-b from-rose-300 to-transparent mx-auto" />
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />
      </header>

      <main>
        {/* Section 1: Timeline */}
        <section className="bg-white rounded-t-[3rem] -mt-12 relative z-20 shadow-2xl">
          <div className="py-20 text-center">
            <h2 className="text-3xl font-bold text-slate-900">I Nostri Ricordi</h2>
            <p className="text-slate-500 mt-2">Un viaggio attraverso i momenti più belli</p>
          </div>
          <Timeline />
        </section>
      </main>
    </>
  );
}

function CouponsPage() {
  return (
    <main className="bg-pink-50 min-h-screen">
      {/* Gift Page Header */}
      <header className="relative h-[60vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-white rounded-b-[4rem] shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-50 text-rose-500 text-[11px] font-bold uppercase tracking-[0.3em] mb-8 shadow-sm border border-rose-100">
            <Gift size={14} />
            Sorpresa
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9] mb-6">
            I Tuoi <br />
            <span className="text-rose-500 italic font-serif">Regali</span>
          </h1>
          <p className="mt-8 text-slate-500 max-w-xs mx-auto text-lg font-medium leading-relaxed opacity-80">
            Scegli il tuo coupon e riscattalo quando vuoi.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12"
          >
            <div className="animate-bounce text-rose-200">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-60">Scorri per vedere</p>
              <div className="w-px h-12 bg-gradient-to-b from-rose-300 to-transparent mx-auto" />
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-rose-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl" />
      </header>

      <div className="py-20">
        <CouponGrid />
      </div>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-pink-50 font-sans selection:bg-rose-200 selection:text-rose-900">
        <Routes>
          <Route path="/" element={<GreetingCard />} />
          <Route path="/journey" element={<HomePage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/secret" element={<SecretPage />} />
          <Route path="/magic" element={<MagicPage />} />
        </Routes>

        <footer className="py-12 text-center text-slate-400 text-sm border-t border-rose-100">
          <p>Fatto con ❤️ per il tuo compleanno speciale</p>
        </footer>
      </div>
    </HashRouter>
  );
}
