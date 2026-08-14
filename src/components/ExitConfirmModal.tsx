import React, { useState, useEffect } from 'react';
import { UserAccount, UserRole } from '../types';
import { LogOut, ShieldAlert, Loader2, CheckCircle2, X, Lock, User, Building } from 'lucide-react';
import { APP_IMAGES } from '../assets/images';

interface ExitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExit: () => void;
  currentUser: UserAccount | null;
  currentRole: UserRole;
}

export const ExitConfirmModal: React.FC<ExitConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmExit,
  currentUser,
  currentRole,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressStep, setProgressStep] = useState('Initializing session termination...');

  // Reset internal state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsExiting(false);
      setProgressPercent(0);
      setProgressStep('Initializing session termination...');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartLogoutProcess = () => {
    setIsExiting(true);
    setProgressPercent(15);
    setProgressStep('Securing audit trail & encrypting session logs...');

    // Multi-step loading sequence lasting approx 2.8 seconds total
    const timer1 = setTimeout(() => {
      setProgressPercent(48);
      setProgressStep('Clearing local COCOBOD auth tokens & security keys...');
    }, 900);

    const timer2 = setTimeout(() => {
      setProgressPercent(82);
      setProgressStep('Terminating active AgriPulse Ghana gateway session...');
    }, 1800);

    const timer3 = setTimeout(() => {
      setProgressPercent(100);
      setProgressStep('Session safely terminated! Redirecting to login portal...');
    }, 2600);

    const timer4 = setTimeout(() => {
      onConfirmExit();
      onClose();
    }, 2850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200/80 relative overflow-hidden">
        
        {/* Top Decorative Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-amber-500 to-rose-600"></div>

        {!isExiting ? (
          /* CONFIRMATION POPUP STEP */
          <div className="space-y-5 pt-1">
            
            {/* Header Title & Close Button */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-rose-100 text-rose-700 rounded-2xl border border-rose-200/80 shadow-sm">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    Confirm Platform Exit
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    AgriPulse Ghana Supply Chain Portal
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                title="Cancel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Warning Prompt Message */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-1 text-xs">
              <p className="font-bold text-amber-950 flex items-center gap-1.5">
                <span>Are you sure you really want to log out and exit?</span>
              </p>
              <p className="text-amber-800 leading-relaxed">
                Signing out will lock your active session, flush temporary client cache, and require re-authentication via your COCOBOD credentials.
              </p>
            </div>

            {/* Active User Session Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                <span className="text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Active Session Profile
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  {currentRole.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-inner shrink-0">
                  {currentUser ? currentUser.fullName.charAt(0) : 'U'}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-100">{currentUser ? currentUser.fullName : 'Guest User'}</div>
                  <div className="text-slate-400 text-[11px] font-mono">{currentUser?.email || 'authenticated@agripulse.gh'}</div>
                  <div className="text-emerald-400 text-[10px] font-medium mt-0.5 flex items-center gap-1">
                    <Building className="w-3 h-3 text-emerald-400" />
                    <span>{currentUser?.organization || 'Ghana Cocoa Board (COCOBOD)'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                id="btn-cancel-logout"
                type="button"
                onClick={onClose}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-all cursor-pointer text-center"
              >
                Cancel &amp; Stay Logged In
              </button>

              <button
                id="btn-confirm-logout"
                type="button"
                onClick={handleStartLogoutProcess}
                className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Yes, Confirm &amp; Exit</span>
              </button>
            </div>

          </div>
        ) : (
          /* REALISTIC LOADER STEP (2.5 to 3 seconds mock platform exit) */
          <div className="py-8 px-2 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Spinning Indicator Badge */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center shadow-xl">
                <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow border-2 border-white">
                <Lock className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5 max-w-xs">
              <h4 className="text-base font-extrabold text-slate-900">
                Terminating Secure Portal Session...
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Please wait while AgriPulse safely closes your session and flushes security credentials.
              </p>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="text-[11px] text-emerald-700 font-mono truncate max-w-[240px]">
                  {progressStep}
                </span>
                <span className="text-amber-600 font-mono">{progressPercent}%</span>
              </div>

              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner p-0.5 border border-slate-300/80">
                <div
                  className="bg-gradient-to-r from-emerald-600 via-amber-500 to-rose-600 h-full rounded-full transition-all duration-300 ease-out shadow"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 font-mono flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>COCOBOD Security Protocol Compliance Active</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
