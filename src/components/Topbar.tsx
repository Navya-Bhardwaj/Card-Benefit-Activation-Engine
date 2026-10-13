import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileDropdown } from './ProfileDropdown';
import type { NotificationItem, UserProfile } from '../types';

interface TopbarProps {
  user: UserProfile;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onToggleMobileMenu: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification?: (item: NotificationItem) => void;
  onNavigateSettings?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  user,
  searchTerm,
  onSearchChange,
  onToggleMobileMenu,
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
  onNavigateSettings
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full bg-[#080D1B]/85 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Greetings */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-2 focus:ring-[#45D9F5]/40"
            aria-label="Open navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white">
                Good evening, <span className="text-gradient-cyan">Alex</span>
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                Protected
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Continuous benefit detection active across 3 credit cards
            </p>
          </div>
        </div>

        {/* Center/Right: Search bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search benefits, merchants, or cards..."
              className="w-full pl-10 pr-12 py-2 bg-[#111A2E]/90 text-sm text-white placeholder-slate-400 rounded-xl border border-white/[0.09] focus:outline-none focus:border-[#45D9F5] focus:ring-2 focus:ring-[#45D9F5]/20 transition-all"
              aria-label="Search dashboard records"
            />
            {searchTerm ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="absolute inset-y-0 right-0 pr-3 hidden sm:flex items-center pointer-events-none">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 border border-white/[0.08]">
                  /
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right action group: Notifications & Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Notification Button */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className={`relative p-2.5 rounded-xl border transition-all ${
                showNotifications
                  ? 'bg-[#111A2E] border-[#45D9F5]/40 text-[#45D9F5]'
                  : 'bg-[#111A2E]/70 border-white/[0.08] text-slate-300 hover:text-white hover:border-white/[0.15]'
              } focus:outline-none focus:ring-2 focus:ring-[#45D9F5]/30`}
              aria-label={`View notifications (${unreadCount} unread)`}
              aria-expanded={showNotifications}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-[#8B7CFF] to-[#45D9F5] text-[10px] font-bold text-[#080D1B] shadow-md shadow-[#45D9F5]/40 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <NotificationDropdown
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
                onMarkAllAsRead={onMarkAllAsRead}
                onSelectNotification={(item) => {
                  if (onSelectNotification) onSelectNotification(item);
                  setShowNotifications(false);
                }}
              />
            )}
          </div>

          {/* User Profile Menu Button */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className={`flex items-center space-x-2.5 p-1 sm:p-1.5 sm:pr-3 rounded-xl border transition-all ${
                showProfile
                  ? 'bg-[#111A2E] border-[#45D9F5]/40'
                  : 'bg-[#111A2E]/70 border-white/[0.08] hover:border-white/[0.15]'
              } focus:outline-none focus:ring-2 focus:ring-[#45D9F5]/30`}
              aria-label="User profile menu"
              aria-expanded={showProfile}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-[#8B7CFF] to-[#45D9F5] p-0.5">
                <div className="w-full h-full bg-[#080D1B] rounded-[6px] flex items-center justify-center font-bold text-xs text-[#45D9F5]">
                  AM
                </div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-white leading-none">Alex Morgan</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Apex Member</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showProfile && (
              <ProfileDropdown
                user={user}
                onClose={() => setShowProfile(false)}
                onNavigateSettings={onNavigateSettings}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
