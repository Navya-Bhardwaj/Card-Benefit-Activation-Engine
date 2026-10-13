import React, { useEffect, useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Copy, 
  Check, 
  Sparkles,
  SquareCheck,
  Square
} from 'lucide-react';
import type { Benefit, ClaimOpportunity, Transaction } from '../types';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  benefit?: Benefit | null;
  claim?: ClaimOpportunity | null;
  transaction?: Transaction | null;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  benefit,
  claim,
  transaction
}) => {
  const [copied, setCopied] = useState(false);
  const [claimSimulated, setClaimSimulated] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});

  const handleClose = () => {
    setCheckedDocs({});
    onClose();
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCheckedDocs({});
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyPolicyRef = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateClaim = () => {
    setClaimSimulated(true);
    setTimeout(() => setClaimSimulated(false), 4000);
  };

  const toggleDocChecked = (idx: number) => {
    setCheckedDocs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#080D1B]/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-2xl bg-[#0D1527] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Glow accent top highlight bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#45D9F5] via-[#8B7CFF] to-cyan-400" />

        {/* Modal Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-start justify-between bg-[#0D1527]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#45D9F5]/10 border border-[#45D9F5]/30 flex items-center justify-center text-[#45D9F5] shadow-inner">
              {claim ? (
                <FileText className="w-5 h-5" />
              ) : (
                <ShieldCheck className="w-5 h-5" />
              )}
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                {claim ? 'Claim Opportunity Details' : transaction ? 'Transaction Protection Analysis' : 'Benefit Policy Breakdown'}
              </span>
              <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {claim?.benefitType || benefit?.title || transaction?.merchant}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-2 focus:ring-[#45D9F5]/40"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Claim Mode view */}
          {claim && (
            <div className="space-y-5">
              {/* Highlight Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#111A2E] to-[#16233F] border border-[#45D9F5]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Estimated Potential Reimbursement</span>
                  <div className="text-2xl sm:text-3xl font-black text-[#45D9F5] font-mono mt-0.5 tracking-tight">
                    {claim.potentialEstAmount}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Based on {claim.cardName} policy limits
                  </p>
                </div>
                <div className="sm:text-right">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/25">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{claim.windowDaysLeft} days remaining</span>
                  </span>
                </div>
              </div>

              {/* Purchase Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-[#080D1B] border border-white/[0.06]">
                  <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Merchant & Date</p>
                  <p className="text-white font-bold text-sm mt-1">{claim.relatedPurchaseMerchant}</p>
                  <p className="text-slate-400 text-xs font-mono mt-0.5">{claim.purchaseDate}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#080D1B] border border-white/[0.06]">
                  <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Charged Amount & Card</p>
                  <p className="text-white font-bold text-sm mt-1 font-mono">
                    ${claim.relatedPurchaseAmount.toFixed(2)}
                  </p>
                  <p className="text-slate-400 text-xs font-mono mt-0.5">{claim.cardName} (•••• {claim.cardLast4})</p>
                </div>
              </div>

              {/* Detected Trigger Details */}
              <div className="p-4 rounded-2xl bg-[#111A2E] border border-white/[0.06] space-y-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#45D9F5]" />
                  Engine Trigger Narrative
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {claim.incidentDetails}
                </p>
              </div>

              {/* Required Documentation with interactive checklist */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Documentation Required (Click to check off)
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {Object.values(checkedDocs).filter(Boolean).length}/{claim.requiredProof.length} Prepared
                  </span>
                </div>
                <div className="space-y-2">
                  {claim.requiredProof.map((item, idx) => {
                    const isChecked = !!checkedDocs[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleDocChecked(idx)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 text-xs ${
                          isChecked
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                            : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.04]'
                        }`}
                      >
                        {isChecked ? (
                          <SquareCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        )}
                        <span className={isChecked ? 'line-through opacity-80' : ''}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Benefit Mode view */}
          {benefit && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#111A2E] to-[#16233F] border border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                  <span className="text-xs font-bold text-[#45D9F5] uppercase tracking-wider">
                    {benefit.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-white px-3 py-1 rounded-xl bg-white/[0.08] border border-white/[0.1]">
                    {benefit.sampleCoverageLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {benefit.fullDescription}
                </p>
              </div>

              {/* Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-[#080D1B] border border-white/[0.06]">
                  <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Filing Time Window</p>
                  <p className="text-white font-bold text-sm mt-1">{benefit.maxDaysWindow}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#080D1B] border border-white/[0.06]">
                  <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Standard Deductible</p>
                  <p className="text-white font-bold text-sm mt-1 font-mono">{benefit.deductible}</p>
                </div>
              </div>

              {/* Policy Rules */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Coverage Terms & Eligibility Rules
                </h4>
                <div className="space-y-2">
                  {benefit.coverageRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 p-2.5 rounded-xl bg-white/[0.02]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documentation */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Typical Required Proof
                </h4>
                <div className="space-y-2">
                  {benefit.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 p-2.5 rounded-xl bg-white/[0.02]">
                      <div className="w-2 h-2 rounded-full bg-[#45D9F5] mt-1.5 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Transaction Mode view */}
          {transaction && !claim && !benefit && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#111A2E] to-[#16233F] border border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Charged</span>
                  <div className="text-3xl font-black text-white font-mono mt-0.5 tracking-tight">
                    ${transaction.amount.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#45D9F5]/10 text-[#45D9F5] border border-[#45D9F5]/30">
                    {transaction.benefitEligibleTag}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-[#080D1B] border border-white/[0.06]">
                  <p className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider">Date of Purchase</p>
                  <p className="text-white font-bold text-sm mt-1">{transaction.date}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#080D1B] border border-white/[0.06]">
                  <p className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider">Payment Method</p>
                  <p className="text-white font-bold text-sm mt-1 font-mono">{transaction.cardName} (•••• {transaction.cardLast4})</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                <p>This transaction has been automatically linked to the <strong>Purchase Protection</strong> rule. If this item incurs accidental damage, liquid spill, or theft within 90 days, you can file a mock claim.</p>
              </div>
            </div>
          )}

          {/* Mandatory academic/educational disclaimer */}
          <div className="p-3.5 rounded-2xl bg-[#080D1B]/90 border border-white/[0.06] flex items-start space-x-2.5 text-[11px] text-slate-400">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>College Major Project Notice:</strong> All policies, limits, and claim opportunities displayed are simulated records for this frontend engine. Does not constitute insurance underwriting or guarantee.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-white/[0.08] bg-[#090F1F] flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
          <button
            type="button"
            onClick={handleCopyPolicyRef}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/[0.06]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Reference</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Policy Code</span>
              </>
            )}
          </button>

          <div className="flex items-center space-x-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleSimulateClaim}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-extrabold bg-[#45D9F5] hover:bg-cyan-300 text-[#080D1B] shadow-md shadow-[#45D9F5]/25 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{claimSimulated ? 'Claim Draft Prepared!' : 'Prepare Mock Draft'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
