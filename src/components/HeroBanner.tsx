import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroBannerProps {
  onExploreBenefits: () => void;
  activeCardCount: number;
  availableBenefitCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreBenefits,
  activeCardCount,
  availableBenefitCount
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/[0.1] bg-gradient-to-br from-[#10192e] via-[#0d1527] to-[#080d1b] shadow-2xl">
      {/* Decorative financial background mesh & radial glow */}
      <div 
        className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#45D9F5]/20 to-[#8B7CFF]/20 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-1/4 -mb-24 w-80 h-80 rounded-full bg-[#8B7CFF]/15 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Abstract geometric grid & lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-50 pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left Column: Headlines & CTA */}
        <div className="max-w-2xl space-y-5">
          {/* Status pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-slate-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#45D9F5] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#45D9F5]"></span>
            </span>
            <span className="text-[#45D9F5] font-bold">Card Benefit Activation Engine</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Continuous Policy Radar</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
              Your benefits.{' '}
              <span className="text-gradient-cyan">Fully unlocked.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Discover the valuable protections already available with your cards. 
              Identify covered purchases, monitor time-sensitive claim windows, and verify eligibility without the paperwork maze.
            </p>
          </div>

          {/* Quick Value Proof Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-medium text-slate-300">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#45D9F5]" />
              Up to $10,000 / occurrence
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8B7CFF]" />
              Flight Delays & Luggage Loss
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              $0 Deductibles on 85% Rules
            </span>
          </div>

          {/* CTA Group */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={onExploreBenefits}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#45D9F5] to-cyan-400 hover:from-cyan-300 hover:to-[#45D9F5] text-[#080D1B] font-bold text-sm tracking-wide shadow-lg shadow-[#45D9F5]/25 hover:shadow-cyan-400/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#45D9F5]"
            >
              <Sparkles className="w-4 h-4 text-[#080D1B]" />
              <span>Explore Benefits</span>
              <ArrowRight className="w-4 h-4 text-[#080D1B]" />
            </button>

            <div className="flex items-center space-x-2.5 px-4 py-3 rounded-xl bg-[#111A2E]/90 border border-white/[0.08] text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#8B7CFF]" />
              <span className="font-medium">
                <strong className="text-white">{availableBenefitCount}</strong> protections active across <strong className="text-white">{activeCardCount}</strong> cards
              </span>
            </div>
          </div>
        </div>

        {/* Right Graphic: Futuristic 3D Hologram Card */}
        <div className="hidden lg:flex items-center justify-center shrink-0">
          <div className="relative w-72 h-44 rounded-3xl p-5 bg-gradient-to-br from-[#16233F] via-[#111A2E] to-[#0A1224] border border-[#45D9F5]/35 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-300 group">
            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-0.5 shadow flex items-center justify-center">
                <div className="w-full h-full border border-amber-900/40 rounded-sm grid grid-cols-2 gap-0.5 p-0.5 opacity-90" />
              </div>
              <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#45D9F5]/10 border border-[#45D9F5]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#45D9F5] animate-ping" />
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#45D9F5]">RADAR SYNCHED</span>
              </div>
            </div>
            
            {/* Card number */}
            <div className="font-mono text-base tracking-[0.22em] text-white font-semibold my-2">
              •••• •••• •••• 4821
            </div>

            {/* Bottom details */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] text-[10px]">
              <div>
                <p className="text-slate-400 uppercase tracking-widest text-[8px] font-bold">Policy Ceiling</p>
                <p className="text-[#45D9F5] font-mono font-bold text-xs">$10,000 / occurrence</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" /> Auto-Covered
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
