import React from 'react';
import { CreditCard, ShieldCheck, AlertCircle, Clock, ArrowUpRight } from 'lucide-react';
import type { SummaryStat } from '../types';

interface StatCardProps {
  stat: SummaryStat;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, onClick }) => {
  const renderIcon = () => {
    switch (stat.icon) {
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-[#45D9F5]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#8B7CFF]" />;
      case 'AlertCircle':
        return <AlertCircle className="w-5 h-5 text-emerald-400" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-amber-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#45D9F5]" />;
    }
  };

  const getAccentBadgeStyles = () => {
    switch (stat.accent) {
      case 'cyan':
        return 'bg-[#45D9F5]/10 text-[#45D9F5] border-[#45D9F5]/30 shadow-sm shadow-[#45D9F5]/10';
      case 'violet':
        return 'bg-[#8B7CFF]/10 text-[#8B7CFF] border-[#8B7CFF]/30 shadow-sm shadow-[#8B7CFF]/10';
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-sm shadow-emerald-500/10';
      case 'amber':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-sm shadow-amber-500/10';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`glass-panel glass-panel-hover rounded-3xl p-5 sm:p-6 border border-white/[0.08] group flex flex-col justify-between ${
        onClick ? 'cursor-pointer' : ''
      }`}
      aria-label={`${stat.title}: ${stat.value}. ${stat.subtitle}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {stat.title}
          </span>
          <div className={`p-2.5 rounded-2xl border ${getAccentBadgeStyles()} transition-transform duration-200 group-hover:scale-105`}>
            {renderIcon()}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {stat.value}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {stat.trend}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {stat.subtitle}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
        <span className="text-slate-400 font-medium">Auto-Detection</span>
        <span className="text-slate-300 font-semibold group-hover:text-[#45D9F5] transition-colors flex items-center gap-1">
          <span>Active</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        </span>
      </div>
    </div>
  );
};
