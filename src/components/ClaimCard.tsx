import React from 'react';
import { 
  Clock, 
  ArrowUpRight, 
  Plane, 
  ShoppingBag, 
  FileSearch,
  ReceiptText,
  Luggage
} from 'lucide-react';
import type { ClaimOpportunity } from '../types';

interface ClaimCardProps {
  claim: ClaimOpportunity;
  onReviewDetails: (claim: ClaimOpportunity) => void;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim, onReviewDetails }) => {
  const isReady = claim.statusType === 'ready';
  const isReview = claim.statusType === 'review';

  const renderIcon = () => {
    if (claim.benefitType.includes('Travel') || claim.benefitType.includes('Delay')) {
      return <Plane className="w-4 h-4 text-[#45D9F5]" />;
    }
    if (claim.benefitType.includes('Baggage')) {
      return <Luggage className="w-4 h-4 text-amber-400" />;
    }
    if (claim.benefitType.includes('Warranty')) {
      return <ReceiptText className="w-4 h-4 text-[#8B7CFF]" />;
    }
    return <ShoppingBag className="w-4 h-4 text-[#45D9F5]" />;
  };

  const getStatusBadge = () => {
    if (isReady) {
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Auto-Draft Ready
        </span>
      );
    }
    if (isReview) {
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border flex items-center gap-1.5 bg-cyan-500/10 text-[#45D9F5] border-[#45D9F5]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#45D9F5] animate-pulse" />
          Carrier Reviewing
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border-amber-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        Time Sensitive
      </span>
    );
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl p-5 sm:p-6 border border-white/[0.08] flex flex-col justify-between group transition-all duration-200">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl border bg-[#080D1B] border-white/[0.1] shadow-inner">
              {renderIcon()}
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Benefit Type
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#45D9F5] transition-colors">
                {claim.benefitType}
              </h4>
            </div>
          </div>

          {getStatusBadge()}
        </div>

        {/* Purchase Info Pill */}
        <div className="p-3.5 rounded-2xl bg-[#080D1B]/80 border border-white/[0.06] mb-3 flex items-center justify-between shadow-inner">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Related Purchase</p>
            <p className="text-xs font-bold text-slate-200 mt-0.5">{claim.relatedPurchaseMerchant}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Charged</p>
            <p className="font-mono text-xs font-bold text-white mt-0.5">${claim.relatedPurchaseAmount.toFixed(2)}</p>
          </div>
        </div>

        {/* Detected Signal notification block */}
        <div className="mb-4 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-semibold mb-1">
            <FileSearch className="w-3.5 h-3.5 text-[#45D9F5]" />
            <span>Detection Narrative</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            {claim.detectedSignal}
          </p>
        </div>

        {/* Opportunity Metrics */}
        <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs">
          <div className="p-3 rounded-2xl bg-[#111A2E] border border-white/[0.06]">
            <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">Estimated Potential</span>
            <span className="font-mono text-xs sm:text-sm font-bold text-emerald-400">{claim.potentialEstAmount}</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#111A2E] border border-white/[0.06]">
            <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">Policy Window</span>
            <span className="font-mono text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> {claim.windowDaysLeft} days left
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-mono">
          REF: #{claim.id.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={() => onReviewDetails(claim)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#111A2E] hover:bg-[#16233F] text-[#45D9F5] border border-[#45D9F5]/35 hover:border-[#45D9F5] text-xs font-bold shadow-sm transition-all group-hover:shadow-md group-hover:shadow-[#45D9F5]/10"
          aria-label={`Review details for ${claim.benefitType} claim`}
        >
          <span>{claim.actionLabel}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
