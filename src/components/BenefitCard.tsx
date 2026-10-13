import React from 'react';
import { 
  ShieldAlert, 
  Undo2, 
  PlaneTakeoff, 
  ReceiptText,
  Luggage,
  PhoneCall,
  ArrowRight, 
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import type { Benefit } from '../types';

interface BenefitCardProps {
  benefit: Benefit;
  onViewDetails: (benefit: Benefit) => void;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({
  benefit,
  onViewDetails
}) => {
  const renderIcon = () => {
    switch (benefit.iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-[#45D9F5]" />;
      case 'Undo2':
        return <Undo2 className="w-5 h-5 text-[#8B7CFF]" />;
      case 'PlaneTakeoff':
        return <PlaneTakeoff className="w-5 h-5 text-cyan-300" />;
      case 'ReceiptText':
        return <ReceiptText className="w-5 h-5 text-emerald-400" />;
      case 'Luggage':
        return <Luggage className="w-5 h-5 text-amber-400" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5 text-rose-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#45D9F5]" />;
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between group transition-all duration-200">
      <div>
        {/* Header: Icon, Category & Verification pill */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#111A2E] to-[#16233F] border border-white/[0.1] flex items-center justify-center p-2.5 shadow-md group-hover:border-[#45D9F5]/40 transition-colors">
            {renderIcon()}
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/[0.08]">
              {benefit.category}
            </span>
            <span className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3 h-3" /> Auto-Monitored
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-[#45D9F5] transition-colors mb-2 tracking-tight">
          {benefit.title}
        </h3>

        {/* Short explanation */}
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
          {benefit.shortExplanation}
        </p>

        {/* Coverage Ceiling Highlight Box */}
        <div className="p-3.5 rounded-2xl bg-[#080D1B]/80 border border-white/[0.07] mb-4 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Estimated Ceiling</span>
            <span className="text-[#45D9F5] font-bold font-mono">
              {benefit.sampleCoverageLabel}
            </span>
          </div>
          <div className="flex items-center text-[10px] text-slate-400 gap-1.5 pt-0.5">
            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
            <span>Filing window: {benefit.maxDaysWindow}</span>
          </div>
        </div>

        {/* Eligible Cards pill tags */}
        <div className="space-y-1.5 mb-5">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Detected on Cards:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {benefit.potEligibleCards.map((cardName, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]"
              >
                {cardName}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[10px] text-slate-400 italic">
          Subject to issuer terms
        </span>
        <button
          type="button"
          onClick={() => onViewDetails(benefit)}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#45D9F5] hover:text-cyan-300 transition-colors py-1 px-2.5 rounded-xl hover:bg-[#45D9F5]/10 group-hover:translate-x-0.5 transform duration-150"
          aria-label={`View details and terms for ${benefit.title}`}
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
