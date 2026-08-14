import React, { useState } from 'react';
import { UserAccount, UserRole } from '../types';
import { INITIAL_USERS } from '../data/mockData';
import { APP_IMAGES } from '../assets/images';
import { X, LogIn, UserPlus, Shield, UserCheck, AlertCircle, CheckCircle2, Sparkles, Key, Building, MapPin, Phone } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('test_inspector@agripulse.gh');
  const [loginPassword, setLoginPassword] = useState('Password123!');
  
  // Register Form State
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [role, setRole] = useState<UserRole>('inspector');
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  const [phoneMoMo, setPhoneMoMo] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();

      if (!res.ok || !data.user) {
        throw new Error(data.error || 'Failed to sign in. Please check your credentials.');
      }

      setSuccessMsg(`Welcome back, ${data.user.fullName}!`);
      setTimeout(() => {
        onLoginSuccess(data.user);
        onClose();
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (presetUser: UserAccount) => {
    setLoginEmail(presetUser.email);
    setLoginPassword(presetUser.password || 'Password123!');
    setIsLoading(true);
    setErrorMsg(null);

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: presetUser.email, password: presetUser.password || 'Password123!' }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          onLoginSuccess(data.user);
          onClose();
        } else {
          // Fallback
          onLoginSuccess(presetUser);
          onClose();
        }
      })
      .catch(() => {
        onLoginSuccess(presetUser);
        onClose();
      })
      .finally(() => setIsLoading(false));
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email: regEmail,
          password: regPassword,
          role,
          organization,
          location,
          phoneMoMo,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.user) {
        throw new Error(data.error || 'Failed to create account.');
      }

      setSuccessMsg(`Account successfully created for ${data.user.fullName}! Badge ID: ${data.user.badgeId}`);
      setTimeout(() => {
        onLoginSuccess(data.user);
        onClose();
      }, 900);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      {/* Background Image Layer for Modal Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
        <img 
          src={APP_IMAGES.beans} 
          alt="Modal Cocoa Background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90"></div>
      </div>

      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative z-10 my-8 overflow-hidden">
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#004D25] via-[#62B62D] to-[#E8A817]"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 bg-[#004D25] text-white rounded-2xl shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#004D25]">AgriPulse Ghana Portal</h2>
            <p className="text-xs text-slate-500 font-medium">User Authentication &amp; System Role Identity</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
          <button
            onClick={() => {
              setTab('login');
              setErrorMsg(null);
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              tab === 'login' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => {
              setTab('register');
              setErrorMsg(null);
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              tab === 'register' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Create New Account</span>
          </button>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-bold animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* LOGIN TAB */}
        {tab === 'login' && (
          <div className="space-y-6">
            
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. test_inspector@agripulse.gh"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#004D25] hover:bg-[#00381B] text-white font-extrabold py-3 rounded-xl shadow-md text-xs transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{isLoading ? 'Authenticating...' : 'Sign In to Account'}</span>
              </button>
            </form>

            {/* Quick Login Presets Section */}
            <div className="border-t border-slate-100 pt-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                1-Click Preset Demo Roles
              </span>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {INITIAL_USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleQuickLogin(user)}
                    className="p-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all cursor-pointer flex flex-col group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 group-hover:text-emerald-900 truncate">
                        {user.fullName}
                      </span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                        {user.role}
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px] truncate">{user.organization}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* REGISTER TAB */}
        {tab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Dr. Kwame Addo"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="e.g. kwame.addo@agripulse.gh"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">System Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="inspector">Quality Inspector</option>
                  <option value="admin">COCOBOD Admin</option>
                  <option value="clerk">Purchasing Clerk</option>
                  <option value="farmer">Producer / Farmer</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number (MoMo Payout)</label>
                <input
                  type="text"
                  value={phoneMoMo}
                  onChange={(e) => setPhoneMoMo(e.target.value)}
                  placeholder="e.g. +233 24 123 4567"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Organization / Department</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Suhum Cocoa Quality Shed"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location / District</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Suhum, Eastern Region"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#004D25] hover:bg-[#00381B] text-white font-extrabold py-3 rounded-xl shadow-md text-xs transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isLoading ? 'Creating Saved Account...' : 'Register & Save Official Account'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
