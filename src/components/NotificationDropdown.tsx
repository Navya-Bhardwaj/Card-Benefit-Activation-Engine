import React from 'react';
import { Bell, CheckCheck, Clock, ShieldAlert, Sparkles, X } from 'lucide-react';
import type { NotificationItem } from '../types';

interface NotificationDropdownProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification?: (item: NotificationItem) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead,
  onSelectNotification
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div 
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl glass-dropdown p-4 z-50 border border-white/[0.1] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
      role="region"
      aria-label="Notifications panel"
    >
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-[#45D9F5]" />
          <h3 className="font-semibold text-sm text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#45D9F5]/20 text-[#45D9F5] border border-[#45D9F5]/30">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="text-[11px] text-[#45D9F5] hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Mark read
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Close notification panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-white/[0.06] max-h-80 overflow-y-auto my-2 pr-1">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No notifications at this time.
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotification && onSelectNotification(item)}
              className={`py-3 px-2 rounded-xl transition-colors cursor-pointer group hover:bg-white/[0.04] ${
                !item.read ? 'bg-[#45D9F5]/[0.03]' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                  item.category === 'claim'
                    ? 'bg-[#45D9F5]/15 text-[#45D9F5]'
                    : item.category === 'benefit'
                    ? 'bg-[#8B7CFF]/15 text-[#8B7CFF]'
                    : 'bg-slate-700/50 text-slate-300'
                }`}>
                  {item.category === 'claim' ? (
                    <ShieldAlert className="w-4 h-4" />
                  ) : item.category === 'benefit' ? (
                    <Sparkles className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-semibold truncate ${
                      !item.read ? 'text-white' : 'text-slate-300'
                    }`}>
                      {item.title}
                    </p>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.message}
                  </p>
                </div>
                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-[#45D9F5] shrink-0 mt-1.5 shadow-sm shadow-[#45D9F5]" />
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-2 border-t border-white/[0.08] text-center">
        <span className="text-[10px] text-slate-400">
          Benefit detection triggers run automatically every 15 minutes.
        </span>
      </div>
    </div>
  );
};
