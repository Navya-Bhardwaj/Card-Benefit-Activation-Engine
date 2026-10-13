import React from 'react';
import { User, Shield, CreditCard, LogOut, CheckCircle2 } from 'lucide-react';
import type { UserProfile } from '../types';

interface ProfileDropdownProps {
  user: UserProfile;
  onClose: () => void;
  onNavigateSettings?: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  onClose,
  onNavigateSettings
}) => {
  return (
    <div 
      className="absolute right-0 top-full mt-2 w-72 rounded-2xl glass-dropdown p-4 z-50 border border-white/[0.1] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
      role="menu"
      aria-label="User profile options"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 pb-3 border-b border-white/[0.08]">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#8B7CFF] to-[#45D9F5] p-0.5 shrink-0">
          <div className="w-full h-full bg-[#111A2E] rounded-[10px] flex items-center justify-center font-bold text-white text-sm">
            AM
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center space-x-1.5">
            <h4 className="text-sm font-semibold text-white truncate">{user.name}</h4>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#45D9F5]" />
          </div>
          <p className="text-xs text-slate-400 truncate">{user.email}</p>
          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-[#8B7CFF]/15 text-[#8B7CFF] border border-[#8B7CFF]/30 font-medium">
            {user.tier}
          </span>
        </div>
      </div>

      {/* Menu links */}
      <div className="py-2 space-y-1">
        <button
          type="button"
          onClick={() => {
            onClose();
            if (onNavigateSettings) onNavigateSettings();
          }}
          className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
          role="menuitem"
        >
          <User className="w-4 h-4 text-slate-400" />
          <span>Account Preferences</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onClose();
            if (onNavigateSettings) onNavigateSettings();
          }}
          className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
          role="menuitem"
        >
          <Shield className="w-4 h-4 text-slate-400" />
          <span>Protection Policy Limits</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onClose();
          }}
          className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
          role="menuitem"
        >
          <CreditCard className="w-4 h-4 text-slate-400" />
          <span>Manage Card Syncing (3 active)</span>
        </button>
      </div>

      {/* Footer / Mock Logout */}
      <div className="pt-2 border-t border-white/[0.08]">
        <button
          type="button"
          onClick={() => {
            alert('Frontend-only demo session: Alex Morgan is currently authenticated with mock credentials.');
            onClose();
          }}
          className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors"
          role="menuitem"
        >
          <LogOut className="w-4 h-4" />
          <span>Switch Account (Demo)</span>
        </button>
      </div>
    </div>
  );
};
