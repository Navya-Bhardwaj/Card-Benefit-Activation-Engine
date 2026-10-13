import React, { useState } from 'react';
import { 
  Sliders, 
  User, 
  Bell, 
  Save, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import type { UserProfile } from '../types';

interface SettingsPageProps {
  user: UserProfile;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [minClaimThreshold, setMinClaimThreshold] = useState('50');
  const [delayThreshold, setDelayThreshold] = useState('6');
  const [autoDraft, setAutoDraft] = useState(true);
  const [flightAlerts, setFlightAlerts] = useState(true);
  const [warrantyAlerts, setWarrantyAlerts] = useState(true);
  const [digestEmail, setDigestEmail] = useState('weekly');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Settings & Preferences
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#45D9F5]/10 text-[#45D9F5] border border-[#45D9F5]/25">
              UI-Only Configuration
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Customize benefit detection sensitivity, policy notifications, and cardholder profile info.
          </p>
        </div>

        {savedFeedback && (
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Preferences Saved Locally!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: User Profile Preferences */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/[0.08] space-y-5">
          <div className="flex items-center space-x-3 pb-4 border-b border-white/[0.08]">
            <div className="p-2 rounded-xl bg-[#45D9F5]/10 text-[#45D9F5]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Cardholder Profile</h2>
              <p className="text-xs text-slate-400">Account metadata associated with generated claim packets</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1.5">
                Full Legal Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#080D1B] text-white rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#45D9F5]"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1.5">
                Primary Notification Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#080D1B] text-white rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#45D9F5]"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1.5">
                Beneficiary Tier
              </label>
              <input
                type="text"
                disabled
                value={user.tier}
                className="w-full px-3.5 py-2.5 bg-[#080D1B]/50 text-slate-400 rounded-xl border border-white/[0.05] cursor-not-allowed font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1.5">
                Reporting Currency
              </label>
              <select className="w-full px-3.5 py-2.5 bg-[#080D1B] text-white rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#45D9F5]">
                <option value="USD">USD ($) United States Dollar</option>
                <option value="EUR">EUR (€) Euro</option>
                <option value="GBP">GBP (£) British Pound</option>
                <option value="CAD">CAD ($) Canadian Dollar</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Engine Detection Sensitivity */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/[0.08] space-y-5">
          <div className="flex items-center space-x-3 pb-4 border-b border-white/[0.08]">
            <div className="p-2 rounded-xl bg-[#8B7CFF]/15 text-[#8B7CFF]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Detection Engine Parameters</h2>
              <p className="text-xs text-slate-400">Control thresholds for anomaly and flight tracking scans</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-[#080D1B] border border-white/[0.06]">
              <div>
                <span className="font-semibold text-white block">Auto-Draft Eligible Claims</span>
                <span className="text-slate-400">Pre-fill claim documentation whenever an airline delay exceeds 6 hours.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={autoDraft}
                  onChange={(e) => setAutoDraft(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#45D9F5]"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-white/[0.06]">
                <label className="font-semibold text-white block mb-1">
                  Minimum Dollar Value to Alert
                </label>
                <p className="text-[11px] text-slate-400 mb-2">Ignore claim opportunities smaller than this amount.</p>
                <select
                  value={minClaimThreshold}
                  onChange={(e) => setMinClaimThreshold(e.target.value)}
                  className="w-full px-3 py-2 bg-[#111A2E] text-white rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#45D9F5]"
                >
                  <option value="25">$25.00 Minimum</option>
                  <option value="50">$50.00 Minimum (Recommended)</option>
                  <option value="100">$100.00 Minimum</option>
                  <option value="250">$250.00 Minimum</option>
                </select>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-white/[0.06]">
                <label className="font-semibold text-white block mb-1">
                  Flight Delay Carrier Threshold
                </label>
                <p className="text-[11px] text-slate-400 mb-2">Time duration before initiating flight delay review.</p>
                <select
                  value={delayThreshold}
                  onChange={(e) => setDelayThreshold(e.target.value)}
                  className="w-full px-3 py-2 bg-[#111A2E] text-white rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#45D9F5]"
                >
                  <option value="4">4 Hours (Lenient)</option>
                  <option value="6">6 Hours (Standard Policy Limit)</option>
                  <option value="8">8 Hours (Strict)</option>
                  <option value="12">12 Hours (Overnight)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Notification Channels */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/[0.08] space-y-5">
          <div className="flex items-center space-x-3 pb-4 border-b border-white/[0.08]">
            <div className="p-2 rounded-xl bg-cyan-400/10 text-cyan-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Alerts & Notification Channels</h2>
              <p className="text-xs text-slate-400">Select when the engine should alert you</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#080D1B] border border-white/[0.06] cursor-pointer">
              <span className="text-slate-200">Instant flight delay & baggage irregularity alerts</span>
              <input
                type="checkbox"
                checked={flightAlerts}
                onChange={(e) => setFlightAlerts(e.target.checked)}
                className="w-4 h-4 rounded accent-[#45D9F5]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#080D1B] border border-white/[0.06] cursor-pointer">
              <span className="text-slate-200">Purchase protection window expiring warnings (30 days left)</span>
              <input
                type="checkbox"
                checked={warrantyAlerts}
                onChange={(e) => setWarrantyAlerts(e.target.checked)}
                className="w-4 h-4 rounded accent-[#45D9F5]"
              />
            </label>

            <div className="p-3 rounded-2xl bg-[#080D1B] border border-white/[0.06] flex items-center justify-between">
              <span className="text-slate-200">Email Digest Cadence</span>
              <select
                value={digestEmail}
                onChange={(e) => setDigestEmail(e.target.value)}
                className="px-3 py-1.5 bg-[#111A2E] text-white rounded-xl border border-white/[0.08] focus:outline-none focus:border-[#45D9F5]"
              >
                <option value="daily">Daily Summary</option>
                <option value="weekly">Weekly Digest (Recommended)</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Academic Project Notice */}
        <div className="p-5 rounded-2xl bg-[#080D1B] border border-white/[0.06] flex items-start space-x-3 text-xs text-slate-400">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-white text-xs">Major Project Architecture Notice</h3>
            <p className="leading-relaxed">
              These settings manipulate the in-memory React state for frontend demonstration. When the Spring Boot backend is developed in the next phase, these preferences will persist in a relational PostgreSQL schema with Spring Security JWT tokens.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end space-x-4 pt-2">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#45D9F5] to-cyan-400 hover:from-cyan-300 hover:to-[#45D9F5] text-[#080D1B] font-bold text-xs sm:text-sm shadow-md shadow-[#45D9F5]/20 transition-all transform hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
