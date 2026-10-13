import React, { useState } from 'react';
import { 
  CreditCard as CreditCardIcon, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Check, 
  Receipt, 
  Download, 
  CheckCircle2
} from 'lucide-react';
import type { CreditCard, Benefit, Transaction } from '../types';
import { PaymentCard } from '../components/PaymentCard';

interface CardsPageProps {
  cards: CreditCard[];
  benefits: Benefit[];
  transactions: Transaction[];
  onViewBenefitDetails: (benefit: Benefit) => void;
  onViewTransactionDetails: (tx: Transaction) => void;
}

export const CardsPage: React.FC<CardsPageProps> = ({
  cards,
  benefits,
  transactions,
  onViewBenefitDetails,
  onViewTransactionDetails,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string>(cards[0]?.id || 'card-1');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [addCardSuccess, setAddCardSuccess] = useState(false);

  // Find active card
  const activeCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  // Benefits associated with activeCard
  const cardBenefits = benefits.filter((b) => {
    if (activeCard.id === 'card-1') return b.potEligibleCards.some((c) => c.includes('Platinum'));
    if (activeCard.id === 'card-2') return b.potEligibleCards.some((c) => c.includes('Travel'));
    if (activeCard.id === 'card-3') return b.potEligibleCards.some((c) => c.includes('Everyday'));
    return false;
  });

  // Transactions made on activeCard
  const cardTransactions = transactions.filter((t) => t.cardId === activeCard.id);

  const handleAddCardDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setAddCardSuccess(true);
    setTimeout(() => {
      setAddCardSuccess(false);
      setShowAddCardModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Cards Portfolio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#45D9F5]/10 text-[#45D9F5] border border-[#45D9F5]/25">
              {cards.length} Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage monitored payment methods and inspect cardholder insurance protection clauses.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddCardModal(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#45D9F5] to-cyan-400 hover:from-cyan-300 hover:to-[#45D9F5] text-[#080D1B] font-bold text-xs sm:text-sm shadow-md shadow-[#45D9F5]/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Card (Demo)</span>
        </button>
      </div>

      {/* 1. Cards Selector Carousel / Grid */}
      <section aria-label="Card selector grid" className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select a Card to View Detailed Protections
          </span>
          <span className="text-xs text-slate-400">
            Active: <strong className="text-white">{activeCard.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div key={card.id} className="relative">
              <PaymentCard
                card={card}
                isSelected={selectedCardId === card.id}
                onSelect={(id) => setSelectedCardId(id)}
              />
              {selectedCardId === card.id && (
                <div className="text-center mt-2">
                  <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-[#45D9F5]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Viewing Breakdown Below</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 2. Detailed Card Breakdown Panel */}
      <section aria-label="Individual card details" className="space-y-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.09] space-y-6 relative overflow-hidden">
          {/* Subtle gradient accent glow */}
          <div 
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ backgroundColor: activeCard.accentColor }}
          />

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#080D1B] border border-white/[0.1] flex items-center justify-center text-[#45D9F5] shadow-inner">
                <CreditCardIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#45D9F5]">
                  {activeCard.issuer}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeCard.name} • {activeCard.cardType}
                </h2>
                <p className="font-mono text-xs text-slate-400">
                  Account ending in {activeCard.last4} • Network: {activeCard.network}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Monitoring Active</span>
              </span>

              <button
                type="button"
                onClick={() => alert(`Simulated export: Benefit guide PDF generated for ${activeCard.name}.`)}
                className="p-2 text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] rounded-xl border border-white/[0.08] transition-colors"
                title="Download Card Policy Summary"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Key Card Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
            <div className="p-4 rounded-2xl bg-[#080D1B]/70 border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                Credit Line / Power
              </span>
              <span className="font-mono text-base font-bold text-white">
                {activeCard.creditLimit || '$25,000 USD'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#080D1B]/70 border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                Annual Program Fee
              </span>
              <span className="font-mono text-base font-bold text-white">
                {activeCard.annualFee || '$0'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#080D1B]/70 border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                Billing Cycle
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                {activeCard.billingCycle}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#080D1B]/70 border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                Protection Tier
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#45D9F5]">
                {activeCard.benefitCount} Protections
              </span>
            </div>
          </div>

          {/* Protection Perks Bullet Grid */}
          {activeCard.protectionPerks && (
            <div className="space-y-3 relative z-10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#45D9F5]" />
                <span>Cardholder Protection Perks</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeCard.protectionPerks.map((perk, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Associated Benefits specifically for this card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#8B7CFF]" />
                <span>Active Protection Policies on {activeCard.name}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {cardBenefits.length} policies are automatically applied when you charge eligible expenses to this card.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cardBenefits.map((benefit) => (
              <div
                key={benefit.id}
                className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                      {benefit.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#45D9F5]">
                      {benefit.sampleCoverageLabel}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-[#45D9F5] transition-colors mb-1.5">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
                    {benefit.shortExplanation}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Window: {benefit.maxDaysWindow}
                  </span>
                  <button
                    type="button"
                    onClick={() => onViewBenefitDetails(benefit)}
                    className="text-xs font-semibold text-[#45D9F5] hover:text-cyan-300 py-1 px-2 rounded-lg hover:bg-[#45D9F5]/10 transition-colors"
                  >
                    View Terms →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Transactions charged to this card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#45D9F5]" />
                <span>Recent Charges on {activeCard.name}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Eligible transactions scanned for policy activation.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.06] text-slate-300 font-mono">
              {cardTransactions.length} charges recorded
            </span>
          </div>

          <div className="glass-panel rounded-3xl border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06] shadow-xl">
            {cardTransactions.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No recent activity recorded for this specific card.
              </div>
            ) : (
              cardTransactions.map((tx) => (
                <div
                  key={tx.id}
                  onClick={() => onViewTransactionDetails(tx)}
                  className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-white group-hover:text-[#45D9F5] transition-colors">
                        {tx.merchant}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-400">
                        {tx.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{tx.date}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-semibold text-[#45D9F5] px-2 py-1 rounded bg-[#45D9F5]/10 border border-[#45D9F5]/20">
                      {tx.benefitEligibleTag}
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      ${tx.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Add Card (Demo Modal) */}
      {showAddCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1B]/85 backdrop-blur-md">
          <div className="bg-[#0D1527] border border-white/[0.12] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-2">Add New Credit Card (Mock)</h3>
            <p className="text-xs text-slate-400 mb-6">
              Simulate adding a card to test the Benefit Activation Engine's policy matching algorithm.
            </p>

            {addCardSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#45D9F5] mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Card Successfully Linked!</h4>
                <p className="text-xs text-slate-400">Policy scanner indexed 6 new protections.</p>
              </div>
            ) : (
              <form onSubmit={handleAddCardDemo} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Card Nickname
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sapphire Preferred"
                    className="w-full px-3.5 py-2.5 bg-[#111A2E] text-white text-xs rounded-xl border border-white/[0.1] focus:outline-none focus:border-[#45D9F5]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Issuing Bank / Financial Entity
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vantage Global Bank"
                    className="w-full px-3.5 py-2.5 bg-[#111A2E] text-white text-xs rounded-xl border border-white/[0.1] focus:outline-none focus:border-[#45D9F5]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Last 4 Digits
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      placeholder="7723"
                      className="w-full px-3.5 py-2.5 bg-[#111A2E] text-white text-xs rounded-xl border border-white/[0.1] focus:outline-none focus:border-[#45D9F5] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="08/29"
                      className="w-full px-3.5 py-2.5 bg-[#111A2E] text-white text-xs rounded-xl border border-white/[0.1] focus:outline-none focus:border-[#45D9F5] font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddCardModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#45D9F5] text-[#080D1B] hover:bg-cyan-300 shadow-md"
                  >
                    Link Card (Demo)
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
