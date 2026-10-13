import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  AlertCircle, 
  Sparkles
} from 'lucide-react';
import type { Benefit, CreditCard } from '../types';
import { BenefitCard } from '../components/BenefitCard';

interface BenefitsPageProps {
  benefits: Benefit[];
  cards: CreditCard[];
  onViewDetails: (benefit: Benefit) => void;
}

export const BenefitsPage: React.FC<BenefitsPageProps> = ({
  benefits,
  cards,
  onViewDetails
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCardFilter, setSelectedCardFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', 'Purchase Safeguard', 'Travel Disruption', 'Retail & Return'];

  const filteredBenefits = useMemo(() => {
    return benefits.filter((b) => {
      const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
      const matchesCard =
        selectedCardFilter === 'All' ||
        b.potEligibleCards.some((c) => c.toLowerCase().includes(selectedCardFilter.toLowerCase()));
      const matchesSearch =
        searchTerm === '' ||
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.shortExplanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.sampleCoverageLabel.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesCard && matchesSearch;
    });
  }, [benefits, selectedCategory, selectedCardFilter, searchTerm]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Benefit Protection Catalog
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#8B7CFF]/15 text-[#8B7CFF] border border-[#8B7CFF]/30">
              {benefits.length} Monitored
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse and inspect active protections discovered across your credit cards.
          </p>
        </div>

        {/* Informational pill */}
        <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-[#45D9F5]" />
          <span>Auto-Synched with Cardholder Agreements</span>
        </div>
      </div>

      {/* Filter and Search Bar Control Group */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/[0.08] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by benefit name, keyword, or rule..."
              className="w-full pl-10 pr-4 py-2 bg-[#080D1B] text-xs sm:text-sm text-white placeholder-slate-400 rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#45D9F5]"
            />
          </div>

          {/* Card Filter Dropdown */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs font-semibold text-slate-400">Card Filter:</span>
            <select
              value={selectedCardFilter}
              onChange={(e) => setSelectedCardFilter(e.target.value)}
              className="bg-[#080D1B] text-xs font-medium text-slate-200 border border-white/[0.1] rounded-xl px-3 py-2 focus:outline-none focus:border-[#45D9F5]"
            >
              <option value="All">All Linked Cards ({cards.length})</option>
              {cards.map((c) => (
                <option key={c.id} value={c.name.split(' ')[0]}>
                  {c.name} (•••• {c.last4})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.06]">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#45D9F5] text-[#080D1B] shadow-sm shadow-[#45D9F5]/30'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Results Grid */}
      <section aria-label="Benefits list" className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredBenefits.length}</strong> of {benefits.length} protection policies
          </span>
          {(selectedCategory !== 'All' || selectedCardFilter !== 'All' || searchTerm) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedCardFilter('All');
                setSearchTerm('');
              }}
              className="text-[#45D9F5] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredBenefits.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No benefits match your query</h3>
            <p className="text-xs">Try selecting a different category or clearing the search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBenefits.map((benefit) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </section>

      {/* Educational Information Footer */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#10192e] to-[#0A1224] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#45D9F5]" />
            <span>How Does The Engine Match Protections?</span>
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            The Card Benefit Activation Engine compares merchant categorization codes (MCC) and airline flight timestamps against known cardholder terms. When an incident meets policy thresholds, an automated claim draft is prepared.
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#45D9F5] shrink-0">
          RULES v1.0 • ACCREDITED
        </span>
      </div>
    </div>
  );
};
