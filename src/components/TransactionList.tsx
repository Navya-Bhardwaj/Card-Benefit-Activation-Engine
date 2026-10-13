import React from 'react';
import { 
  ShoppingBag, 
  Plane, 
  Shirt, 
  Hotel, 
  Receipt, 
  ShieldCheck, 
  ChevronRight,
  Utensils
} from 'lucide-react';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onSelectTransaction
}) => {
  const getCategoryIcon = (category: Transaction['category']) => {
    switch (category) {
      case 'Electronics':
        return <ShoppingBag className="w-4 h-4 text-[#45D9F5]" />;
      case 'Travel':
        return <Plane className="w-4 h-4 text-[#8B7CFF]" />;
      case 'Apparel':
        return <Shirt className="w-4 h-4 text-emerald-400" />;
      case 'Lodging':
        return <Hotel className="w-4 h-4 text-amber-400" />;
      case 'Dining':
        return <Utensils className="w-4 h-4 text-rose-400" />;
      default:
        return <Receipt className="w-4 h-4 text-slate-300" />;
    }
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/[0.08] overflow-hidden shadow-xl">
      {/* Table header / info */}
      <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Recent Activity</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 font-mono font-medium">
              {transactions.length} items
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Card purchases automatically tagged with applicable protection rules
          </p>
        </div>
      </div>

      {/* List content */}
      {transactions.length === 0 ? (
        <div className="py-16 text-center text-slate-400 text-sm space-y-2">
          <Receipt className="w-8 h-8 text-slate-500 mx-auto opacity-60" />
          <p className="font-semibold text-slate-300">No transactions match your current search or filter.</p>
          <p className="text-xs text-slate-500">Try searching for a different merchant or card.</p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06]">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              onClick={() => onSelectTransaction(tx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectTransaction(tx);
                }
              }}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.035] transition-colors cursor-pointer group"
              aria-label={`Transaction at ${tx.merchant} for $${tx.amount.toFixed(2)}. ${tx.benefitEligibleTag}`}
            >
              {/* Left: Merchant & Icon */}
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#080D1B] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-[#45D9F5]/40 transition-colors shadow-inner">
                  {getCategoryIcon(tx.category)}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white group-hover:text-[#45D9F5] transition-colors">
                      {tx.merchant}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-400 border border-white/[0.06]">
                      {tx.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                    <span className="font-mono text-[11px]">{tx.date}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px] text-slate-300">
                      {tx.cardName} (•••• {tx.cardLast4})
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Protection tag & Amount */}
              <div className="flex items-center justify-between sm:justify-end space-x-4 pl-13 sm:pl-0">
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#45D9F5]/10 border border-[#45D9F5]/25 text-[#45D9F5] text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[11px]">{tx.benefitEligibleTag}</span>
                </div>

                <div className="text-right">
                  <span className="font-mono text-sm sm:text-base font-extrabold text-white tracking-tight">
                    ${tx.amount.toFixed(2)}
                  </span>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#45D9F5] group-hover:translate-x-0.5 transition-all hidden sm:block" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer hint */}
      <div className="p-3.5 bg-[#080D1B]/60 border-t border-white/[0.06] text-center text-[11px] text-slate-400">
        Transactions are mock simulated records for educational dashboard testing.
      </div>
    </div>
  );
};
