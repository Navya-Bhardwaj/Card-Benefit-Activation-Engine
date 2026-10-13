import React from 'react';
import { ShieldCheck, Wifi, Check, Sparkles } from 'lucide-react';
import type { CreditCard } from '../types';

interface PaymentCardProps {
  card: CreditCard;
  isSelected: boolean;
  onSelect: (cardId: string) => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  card,
  isSelected,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(card.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(card.id);
        }
      }}
      className={`relative w-full rounded-3xl p-6 transition-all duration-300 cursor-pointer overflow-hidden group select-none ${
        card.gradientClass
      } ${
        isSelected
          ? 'ring-2 ring-[#45D9F5] shadow-2xl shadow-[#45D9F5]/20 scale-[1.02]'
          : 'hover:scale-[1.01] hover:border-white/35 hover:shadow-xl hover:shadow-black/50'
      }`}
      aria-label={`${card.name} issued by ${card.issuer}. ${card.benefitCount} active protections. ${isSelected ? 'Currently selected filter.' : 'Click to filter.'}`}
      aria-pressed={isSelected}
    >
      {/* Subtle light reflection diagonal sheen */}
      <div 
        className="absolute -inset-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent rotate-45 pointer-events-none group-hover:translate-x-full transition-transform duration-1000 ease-out" 
        aria-hidden="true"
      />

      {/* Decorative ambient radial glow */}
      <div 
        className="absolute -right-20 -top-20 w-48 h-48 rounded-full opacity-25 blur-2xl pointer-events-none group-hover:opacity-40 transition-opacity" 
        style={{ backgroundColor: card.accentColor }}
        aria-hidden="true"
      />

      {/* Top row: Issuer and Contactless / Filtered State */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300/80">
            {card.issuer}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide mt-0.5">
            {card.name}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          {isSelected ? (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#45D9F5] text-[#080D1B] flex items-center space-x-1 shadow-md shadow-[#45D9F5]/30">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>ACTIVE FILTER</span>
            </span>
          ) : (
            <div className="flex items-center space-x-1.5 text-slate-400 group-hover:text-slate-200 transition-colors">
              <Wifi className="w-4 h-4 rotate-90 opacity-75 group-hover:opacity-100" />
            </div>
          )}
        </div>
      </div>

      {/* Middle row: Realistic EMV Chip & Network aesthetic */}
      <div className="flex items-center justify-between my-4 relative z-10">
        {/* EMV Chip */}
        <div className="w-11 h-8 rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-0.5 shadow-md flex items-center justify-center">
          <div className="w-full h-full border border-amber-950/40 rounded-[5px] grid grid-cols-2 gap-0.5 p-0.5 opacity-90 bg-amber-300/20">
            <div className="border-r border-b border-amber-900/40" />
            <div className="border-b border-amber-900/40" />
            <div className="border-r border-amber-900/40" />
            <div />
          </div>
        </div>

        {/* Network & Holographic badge */}
        <div className="flex items-center space-x-2">
          <div className="px-2 py-0.5 rounded bg-white/[0.08] border border-white/[0.1] text-[9px] font-mono font-bold tracking-widest text-slate-300 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#45D9F5]" />
            <span>SECURE CHIP</span>
          </div>
          <span className="font-mono text-xs font-black tracking-widest text-white/90">
            {card.network}
          </span>
        </div>
      </div>

      {/* Masked Card Number with realistic embossed styling */}
      <div className="font-mono text-base sm:text-lg tracking-[0.28em] text-white/95 font-semibold my-4 relative z-10 drop-shadow-sm">
        •••• •••• •••• {card.last4}
      </div>

      {/* Bottom details: Cardholder, Expiry, and Benefit Badge */}
      <div className="flex items-end justify-between pt-3 border-t border-white/[0.1] relative z-10">
        <div>
          <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Cardholder</p>
          <p className="font-mono text-xs text-slate-100 font-bold uppercase tracking-wider">{card.cardholder}</p>
        </div>

        <div className="text-center">
          <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Expires</p>
          <p className="font-mono text-xs text-slate-100 font-bold">{card.expDate}</p>
        </div>

        <div className="text-right">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-white/[0.08] border border-white/[0.12] text-xs font-medium text-white group-hover:border-[#45D9F5]/40 transition-colors shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#45D9F5]" />
            <span className="text-[11px] font-bold">{card.benefitCount} Protections</span>
          </div>
        </div>
      </div>
    </div>
  );
};
