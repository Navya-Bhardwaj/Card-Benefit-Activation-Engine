import React, { useState, useMemo } from 'react';
import { 
  AlertCircle, 
  Clock, 
  FileCheck2, 
  Filter, 
  DollarSign, 
  Sparkles, 
  Search, 
  CheckCircle2
} from 'lucide-react';
import type { ClaimOpportunity } from '../types';
import { ClaimCard } from '../components/ClaimCard';

interface ClaimsPageProps {
  claims: ClaimOpportunity[];
  onReviewDetails: (claim: ClaimOpportunity) => void;
}

export const ClaimsPage: React.FC<ClaimsPageProps> = ({
  claims,
  onReviewDetails
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSimulateModal, setShowSimulateModal] = useState<boolean>(false);
  const [activeSimulateClaim, setActiveSimulateClaim] = useState<ClaimOpportunity | null>(null);

  const statusOptions = ['All', 'Draft Ready', 'Action Recommended', 'Under Review'];

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const matchesStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'Draft Ready' && claim.statusType === 'ready') ||
        (selectedStatus === 'Action Recommended' && claim.statusType === 'recommended') ||
        (selectedStatus === 'Under Review' && claim.statusType === 'review');

      const matchesSearch =
        searchTerm === '' ||
        claim.benefitType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.relatedPurchaseMerchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.detectedSignal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.cardName.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [claims, selectedStatus, searchTerm]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Claims Radar & Opportunities
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#45D9F5]/10 text-[#45D9F5] border border-[#45D9F5]/25">
              {claims.length} Opportunities
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Proactively tracks time-sensitive reimbursement windows based on transaction anomalies.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveSimulateClaim(claims[0]);
            setShowSimulateModal(true);
          }}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#45D9F5] to-cyan-400 hover:from-cyan-300 hover:to-[#45D9F5] text-[#080D1B] font-bold text-xs sm:text-sm shadow-md shadow-[#45D9F5]/20 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 stroke-[2.5]" />
          <span>Simulate Claim Filing</span>
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Estimated Total Potential
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#45D9F5] font-mono">
              $1,420.00
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Across 4 active opportunities</p>
          </div>
          <div className="p-3 rounded-xl bg-[#45D9F5]/10 text-[#45D9F5] border border-[#45D9F5]/20">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Auto-Drafted Claims
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              2 Ready
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Evidence pre-attached</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Urgent Filing Deadline
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
              14 Days
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Baggage transit window</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status:</span>
          </span>
          {statusOptions.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedStatus === st
                  ? 'bg-[#45D9F5] text-[#080D1B] shadow-sm'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search claims or merchants..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#080D1B] text-xs text-white placeholder-slate-400 rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#45D9F5]"
          />
        </div>
      </div>

      {/* Claim Cards Grid */}
      <section aria-label="Claims list" className="space-y-4">
        {filteredClaims.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No claims match the selected criteria</h3>
            <p className="text-xs">Adjust your filter to view all detected opportunities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClaims.map((claim) => (
              <ClaimCard
                key={claim.id}
                claim={claim}
                onReviewDetails={onReviewDetails}
              />
            ))}
          </div>
        )}
      </section>

      {/* Simulation Modal (Frontend Only Simulator) */}
      {showSimulateModal && activeSimulateClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D1B]/85 backdrop-blur-md">
          <div className="bg-[#0D1527] border border-white/[0.12] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center space-x-2 text-[#45D9F5]">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Simulated Claim Wizard</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#45D9F5]/10 text-[#45D9F5] font-mono">
                DEMO MODE
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              You are simulating a claim packet for <strong>{activeSimulateClaim.relatedPurchaseMerchant}</strong> under <strong>{activeSimulateClaim.benefitType}</strong>.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#080D1B] border border-white/[0.06] flex items-center justify-between">
                <span className="text-slate-400">Merchant Charge:</span>
                <span className="text-white font-mono font-semibold">${activeSimulateClaim.relatedPurchaseAmount.toFixed(2)}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#080D1B] border border-white/[0.06] flex items-center justify-between">
                <span className="text-slate-400">Card Used:</span>
                <span className="text-white font-mono">{activeSimulateClaim.cardName}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#080D1B] border border-white/[0.06] flex items-center justify-between">
                <span className="text-slate-400">Estimated Benefit Cap:</span>
                <span className="text-[#45D9F5] font-mono font-bold">{activeSimulateClaim.potentialEstAmount}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Simulated verification: Flight delay proof and digital receipts validated against issuer rule thresholds.</span>
            </div>

            <div className="pt-3 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowSimulateModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Simulation packet downloaded! In Phase 2, this will submit directly to the Spring Boot REST API.');
                  setShowSimulateModal(false);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#45D9F5] text-[#080D1B] hover:bg-cyan-300 shadow-md"
              >
                Generate Mock Packet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
