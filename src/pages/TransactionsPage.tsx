import React, { useState, useMemo } from 'react';
import { 
  Receipt, 
  Search, 
  Filter, 
  Download, 
  ShieldCheck, 
  ArrowUpDown, 
  ShoppingBag, 
  Plane, 
  Shirt, 
  Hotel, 
  Utensils,
  RefreshCw
} from 'lucide-react';
import type { Transaction, CreditCard } from '../types';

interface TransactionsPageProps {
  transactions: Transaction[];
  cards: CreditCard[];
  onSelectTransaction: (tx: Transaction) => void;
}

export const TransactionsPage: React.FC<TransactionsPageProps> = ({
  transactions,
  cards,
  onSelectTransaction
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCardFilter, setSelectedCardFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const categories = ['All', 'Electronics', 'Travel', 'Apparel', 'Lodging', 'Dining'];

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
        const matchesCard = selectedCardFilter === 'All' || tx.cardId === selectedCardFilter;
        const matchesSearch =
          searchTerm === '' ||
          tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.cardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.benefitEligibleTag.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesCard && matchesSearch;
      })
      .sort((a, b) => {
        return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      });
  }, [transactions, selectedCategory, selectedCardFilter, searchTerm, sortOrder]);

  const totalSpent = useMemo(() => {
    return filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredTransactions]);

  const getCategoryIcon = (category: Transaction['category']) => {
    switch (category) {
      case 'Electronics':
        return <ShoppingBag className="w-3.5 h-3.5 text-[#45D9F5]" />;
      case 'Travel':
        return <Plane className="w-3.5 h-3.5 text-[#8B7CFF]" />;
      case 'Apparel':
        return <Shirt className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Lodging':
        return <Hotel className="w-3.5 h-3.5 text-amber-400" />;
      case 'Dining':
        return <Utensils className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Receipt className="w-3.5 h-3.5 text-slate-300" />;
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const handleExportCSV = () => {
    const headers = 'Transaction ID,Merchant,Category,Date,Amount,Card,Benefit Tag\n';
    const rows = filteredTransactions
      .map(
        (t) =>
          `"${t.id}","${t.merchant}","${t.category}","${t.date}",${t.amount},"${t.cardName} (•••• ${t.cardLast4})","${t.benefitEligibleTag}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cardbenefit_transactions_scanned.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Scanned Transactions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#45D9F5]/10 text-[#45D9F5] border border-[#45D9F5]/25">
              {transactions.length} Scanned
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every charged transaction is automatically evaluated for cardholder claim windows.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-medium transition-colors"
            title="Simulate refreshing statement scan"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#45D9F5] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Scan Feed</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#111A2E] hover:bg-[#16233F] text-slate-200 hover:text-white border border-[#45D9F5]/30 text-xs font-bold shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#45D9F5]" />
            <span>Export Scanned CSV</span>
          </button>
        </div>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="glass-panel rounded-3xl p-5 border border-white/[0.08] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by merchant, card, or category..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#080D1B] text-xs sm:text-sm text-white placeholder-slate-400 rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#45D9F5]"
            />
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {/* Card Select */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-semibold">Card:</span>
              <select
                value={selectedCardFilter}
                onChange={(e) => setSelectedCardFilter(e.target.value)}
                className="bg-[#080D1B] text-xs font-medium text-slate-200 border border-white/[0.1] rounded-xl px-3 py-2 focus:outline-none focus:border-[#45D9F5]"
              >
                <option value="All">All Cards ({cards.length})</option>
                {cards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (•••• {c.last4})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Toggle */}
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#080D1B] border border-white/[0.1] text-xs text-slate-300 hover:text-white transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#45D9F5]" />
              <span>Amount ({sortOrder === 'desc' ? 'High' : 'Low'})</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
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
                  ? 'bg-[#45D9F5] text-[#080D1B] shadow-sm'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction Table */}
      <div className="glass-panel rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl">
        {/* Table summary bar */}
        <div className="p-4 bg-[#0A1224] border-b border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredTransactions.length}</strong> transactions
          </span>
          <span>
            Filtered Total: <strong className="text-[#45D9F5] font-mono">${totalSpent.toFixed(2)} USD</strong>
          </span>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-[#080D1B]/70 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                <th className="py-3.5 px-4 sm:px-6">Merchant & Category</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Protection Tag</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05] text-xs">
              {isRefreshing ? (
                // Subtle skeleton loading placeholder
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.05] skeleton-shimmer" />
                        <div className="space-y-1.5">
                          <div className="w-28 h-3 rounded bg-white/[0.06] skeleton-shimmer" />
                          <div className="w-16 h-2.5 rounded bg-white/[0.04] skeleton-shimmer" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4"><div className="w-20 h-3 rounded bg-white/[0.05] skeleton-shimmer" /></td>
                    <td className="py-4 px-4"><div className="w-24 h-3 rounded bg-white/[0.05] skeleton-shimmer" /></td>
                    <td className="py-4 px-4"><div className="w-32 h-4 rounded bg-white/[0.05] skeleton-shimmer" /></td>
                    <td className="py-4 px-4 text-right"><div className="w-16 h-3 rounded bg-white/[0.05] ml-auto skeleton-shimmer" /></td>
                    <td className="py-4 px-4 text-right"><div className="w-12 h-3 rounded bg-white/[0.05] ml-auto skeleton-shimmer" /></td>
                  </tr>
                ))
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-400 space-y-3">
                    <Receipt className="w-10 h-10 text-slate-500 mx-auto opacity-50" />
                    <p className="font-semibold text-slate-200 text-sm">No transactions found matching your criteria</p>
                    <p className="text-xs text-slate-400">Try adjusting your filters or resetting your search.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('All');
                        setSelectedCardFilter('All');
                      }}
                      className="text-xs text-[#45D9F5] hover:underline font-bold mt-2"
                    >
                      Reset All Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => onSelectTransaction(tx)}
                    className="hover:bg-white/[0.035] transition-colors cursor-pointer group"
                  >
                    {/* Merchant & Category */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-[#080D1B] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-[#45D9F5]/40 transition-colors shadow-inner">
                          {getCategoryIcon(tx.category)}
                        </div>
                        <div>
                          <p className="font-bold text-white group-hover:text-[#45D9F5] transition-colors">
                            {tx.merchant}
                          </p>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {tx.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-slate-300 font-mono text-[11px]">
                      {tx.date}
                    </td>

                    {/* Card */}
                    <td className="py-4 px-4">
                      <span className="font-mono text-[11px] text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                        {tx.cardName} (•••• {tx.cardLast4})
                      </span>
                    </td>

                    {/* Protection Tag */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#45D9F5]/10 border border-[#45D9F5]/25 text-[#45D9F5] text-[11px] font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>{tx.benefitEligibleTag}</span>
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 text-right font-mono font-bold text-white text-sm">
                      ${tx.amount.toFixed(2)}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTransaction(tx);
                        }}
                        className="text-xs text-[#45D9F5] hover:text-cyan-300 font-bold px-3 py-1 rounded-lg hover:bg-[#45D9F5]/10 transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
