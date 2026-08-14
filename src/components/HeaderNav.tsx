import React from 'react';
import { UserRole, UserAccount } from '../types';
import { AgriPulseLogo } from './AgriPulseLogo';
import { UserCheck, LogOut } from 'lucide-react';

interface HeaderNavProps {
  currentRole: UserRole;
  currentUser: UserAccount | null;
  onRoleChange: (role: UserRole) => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentRole,
  currentUser,
  onRoleChange,
  onOpenAuthModal,
  onLogout,
}) => {
  // Extract initials
  const initials = currentUser
    ? currentUser.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'GH';

  return (
    <header className="bg-[#00381B] border-b border-[#00502B] text-white sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & COCOBOD Quality Badge */}
          <div className="flex items-center space-x-3">
            <AgriPulseLogo variant="horizontal" theme="dark" className="h-10" />
            
            <div className="hidden sm:block border-l border-emerald-800/80 pl-3 py-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="bg-[#E8A817]/20 text-[#F0AD1B] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#E8A817]/40 uppercase tracking-wide">
                  COCOBOD Regulated
                </span>
              </div>
              <p className="text-[10px] text-emerald-200/90 font-medium mt-0.5">Ghana Agricultural Produce Supply Chain</p>
            </div>
          </div>

          {/* Right Controls: User Profile & Quick Role Switcher */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Role Selector dropdown */}
            <div className="flex items-center space-x-1.5 bg-[#002B15]/80 border border-[#00502B] px-3 py-1.5 rounded-2xl shadow-inner">
              <UserCheck className="w-3.5 h-3.5 text-[#62B62D]" />
              <select
                id="header-role-selector"
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="bg-transparent text-xs text-emerald-100 font-bold focus:outline-none cursor-pointer"
              >
                <option value="admin" className="bg-[#00381B] text-white">Role: COCOBOD Admin</option>
                <option value="inspector" className="bg-[#00381B] text-white">Role: Quality Inspector</option>
                <option value="clerk" className="bg-[#00381B] text-white">Role: Transport Clerk</option>
                <option value="farmer" className="bg-[#00381B] text-white">Role: Producer / Farmer</option>
              </select>
            </div>

            {/* User Profile Badge / Login Trigger */}
            <div className="flex items-center space-x-1">
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-2.5 bg-[#002B15]/90 hover:bg-[#004D25] border border-[#00502B] px-3 py-1.5 rounded-2xl transition-all cursor-pointer group shadow-sm"
                title="Click to Switch Account"
              >
                <div className="w-7 h-7 rounded-xl bg-[#E8A817] text-slate-950 font-black text-xs flex items-center justify-center shadow-inner shrink-0">
                  {initials}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-black text-white group-hover:text-[#F0AD1B] truncate max-w-[130px]">
                    {currentUser ? currentUser.fullName : 'Sign In / Register'}
                  </div>
                  <div className="text-[10px] text-emerald-300 flex items-center gap-1 font-mono">
                    <span>{currentUser ? currentUser.badgeId : 'Account Auth'}</span>
                    <span className="text-[#62B62D] font-bold uppercase">({currentRole})</span>
                  </div>
                </div>
              </button>

              <button
                onClick={onLogout}
                className="p-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 text-rose-300 hover:text-white rounded-xl transition-all cursor-pointer ml-1"
                title="Sign Out / Lock Portal"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};


