import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  ShieldCheck, 
  FileText, 
  Receipt, 
  Settings, 
  X,
  Sparkles,
  Shield
} from 'lucide-react';
import type { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  claimOpportunityCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  mobileOpen,
  onCloseMobile,
  claimOpportunityCount
}) => {
  const navItems = [
    { id: 'overview' as NavigationTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'cards' as NavigationTab, label: 'My Cards', icon: CreditCard, count: '3' },
    { id: 'benefits' as NavigationTab, label: 'Benefits', icon: ShieldCheck, count: '12' },
    { id: 'claims' as NavigationTab, label: 'Claims', icon: FileText, badge: `${claimOpportunityCount} New`, badgeColor: 'cyan' },
    { id: 'transactions' as NavigationTab, label: 'Transactions', icon: Receipt },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-[#080D1B]/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0C1427] border-r border-white/[0.08] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main Navigation"
      >
        {/* Logo and branding */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B7CFF] via-[#45D9F5] to-cyan-300 p-0.5 shadow-lg shadow-[#45D9F5]/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#080D1B] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#45D9F5]" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-lg tracking-tight text-white">CardBenefit</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-[#45D9F5]/15 text-[#45D9F5] border border-[#45D9F5]/30">
                  Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Protection Discovery</p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button 
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Menu Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onTabChange(item.id);
                  onCloseMobile();
                }}
                className={`w-full relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#111A2E] to-[#16233F] text-white border border-[#45D9F5]/35 shadow-lg shadow-[#45D9F5]/10 before:absolute before:left-0 before:top-2.5 before:bottom-2.5 before:w-1 before:bg-[#45D9F5] before:rounded-r-full'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#45D9F5]/15 text-[#45D9F5]' 
                      : 'text-slate-400 group-hover:text-slate-200 group-hover:bg-white/[0.05]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#45D9F5]/15 text-[#45D9F5] border border-[#45D9F5]/30 animate-pulse">
                    {item.badge}
                  </span>
                )}

                {item.count && !item.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-400">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Engine status indicator card at bottom */}
        <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-[#111A2E] to-[#0A1224] border border-white/[0.08] relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#8B7CFF]/15 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center space-x-2.5 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#45D9F5] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#45D9F5]"></span>
            </span>
            <span className="text-xs font-semibold text-slate-200">Continuous Monitoring</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Local rule engine scanning 3 active card protection policies against recent charges.
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] text-slate-400 font-mono">
            <span>CORE ENGINE v1.0</span>
            <span className="text-[#45D9F5] flex items-center gap-1 font-sans font-semibold">
              <Sparkles className="w-3 h-3" /> Live
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
