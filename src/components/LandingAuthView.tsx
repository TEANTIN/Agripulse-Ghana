import React, { useState } from 'react';
import { UserAccount, UserRole } from '../types';
import { INITIAL_USERS } from '../data/mockData';
import { AgriPulseLogo } from './AgriPulseLogo';
import { APP_IMAGES } from '../assets/images';
import { 
  ShieldCheck, LogIn, UserPlus, AlertCircle, CheckCircle2, 
  Sparkles, Layers, Truck, Award, Banknote, ArrowRight, BookOpen, User, Lock, Check
} from 'lucide-react';

interface LandingAuthViewProps {
  onLoginSuccess: (user: UserAccount) => void;
}

export const LandingAuthView: React.FC<LandingAuthViewProps> = ({ onLoginSuccess }) => {
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

      setSuccessMsg(`Welcome back, ${data.user.fullName}! Entering platform...`);
      setTimeout(() => {
        onLoginSuccess(data.user);
      }, 600);
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
        } else {
          onLoginSuccess(presetUser);
        }
      })
      .catch(() => {
        onLoginSuccess(presetUser);
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

      setSuccessMsg(`Account created! Badge ID: ${data.user.badgeId}. Accessing dashboard...`);
      setTimeout(() => {
        onLoginSuccess(data.user);
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-[#62B62D] selection:text-white relative overflow-hidden">
      
      {/* Agriculture Supply Chain Image Background Overlay - Made highly visible */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src={APP_IMAGES.beans} 
          alt="Ghana Cocoa Agriculture Background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-55 filter brightness-90 contrast-110 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#002813]/85 via-slate-950/80 to-[#00170C]/90 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(98,182,45,0.22),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,168,23,0.18),transparent_55%)]"></div>
      </div>

      {/* Top Brand Banner */}
      <header className="bg-[#00381B]/95 backdrop-blur-md border-b border-[#00502B] py-4 px-4 sm:px-8 shadow-xl relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <AgriPulseLogo variant="horizontal" theme="dark" className="h-10 sm:h-12" />
          
          <div className="hidden md:flex items-center space-x-3">
            <span className="bg-[#E8A817]/20 text-[#F0AD1B] text-xs font-black px-3 py-1 rounded-full border border-[#E8A817]/40 uppercase tracking-wide">
              COCOBOD Official Gateway
            </span>
            <span className="text-xs text-emerald-300 font-mono">Ghana Produce Supply Chain Portal</span>
          </div>
        </div>
      </header>

      {/* Hero & Login / Register Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col lg:flex-row items-start justify-between gap-10 relative z-10">
        
        {/* Left Column: Platform Description & Visual Photo Cards */}
        <div className="flex-1 space-y-6 text-left">
          
          <div className="inline-flex items-center space-x-2 bg-[#004D25]/80 border border-[#006B3F] text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#E8A817]" />
            <span>Secure Enterprise Quality &amp; Logistics Gate</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Smart Cocoa Supply Chain &amp; <span className="text-[#62B62D]">Quality Logistics</span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium max-w-2xl drop-shadow">
            AgriPulse Ghana is a web-based logistics and quality inspection platform built for the Ghana Cocoa Board (COCOBOD), purchasing clerks, quality control inspectors, and cocoa farmers. It digitizes produce batch registration, AI quality grading, digital waybills, export warehouse custody, and instant Mobile Money payouts.
          </p>

          {/* Visual Showcase: Cocoa Farmers, Inspectors, Logistics & Beans Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            
            {/* Card 1: Cocoa Farmer */}
            <div className="group relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-900/80 shadow-lg hover:border-[#62B62D] transition-all">
              <div className="h-28 sm:h-32 w-full overflow-hidden relative">
                <img 
                  src={APP_IMAGES.farmer} 
                  alt="Ghana Cocoa Farmer & Harvest" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span className="absolute top-2 left-2 bg-[#004D25]/90 text-emerald-300 text-[9px] font-black px-2 py-0.5 rounded-md border border-emerald-500/30 uppercase">
                  Farmers
                </span>
              </div>
              <div className="p-2.5">
                <h3 className="text-xs font-extrabold text-white group-hover:text-[#62B62D] transition-colors">Ghanaian Producers</h3>
                <p className="text-[10px] text-slate-300 font-medium">Cocoa pod harvest &amp; MoMo payouts</p>
              </div>
            </div>

            {/* Card 2: Quality Inspector */}
            <div className="group relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-900/80 shadow-lg hover:border-[#62B62D] transition-all">
              <div className="h-28 sm:h-32 w-full overflow-hidden relative">
                <img 
                  src={APP_IMAGES.inspector} 
                  alt="COCOBOD Quality Inspector" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span className="absolute top-2 left-2 bg-[#004D25]/90 text-emerald-300 text-[9px] font-black px-2 py-0.5 rounded-md border border-emerald-500/30 uppercase">
                  Inspectors
                </span>
              </div>
              <div className="p-2.5">
                <h3 className="text-xs font-extrabold text-white group-hover:text-[#62B62D] transition-colors">Quality Control</h3>
                <p className="text-[10px] text-slate-300 font-medium">AI moisture &amp; grade verification</p>
              </div>
            </div>

            {/* Card 3: Logistics Truck */}
            <div className="group relative rounded-2xl overflow-hidden border border-amber-500/40 bg-slate-900/80 shadow-lg hover:border-[#E8A817] transition-all">
              <div className="h-28 sm:h-32 w-full overflow-hidden relative">
                <img 
                  src={APP_IMAGES.logistics} 
                  alt="Logistics Haulage Truck" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span className="absolute top-2 left-2 bg-[#E8A817]/90 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md border border-amber-300/30 uppercase">
                  Transport
                </span>
              </div>
              <div className="p-2.5">
                <h3 className="text-xs font-extrabold text-white group-hover:text-[#E8A817] transition-colors">Haulage &amp; Waybills</h3>
                <p className="text-[10px] text-slate-300 font-medium">Digital QR custody tracking</p>
              </div>
            </div>

            {/* Card 4: Cocoa Beans */}
            <div className="group relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-900/80 shadow-lg hover:border-[#62B62D] transition-all">
              <div className="h-28 sm:h-32 w-full overflow-hidden relative">
                <img 
                  src={APP_IMAGES.beans} 
                  alt="Quality Dried Cocoa Beans" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span className="absolute top-2 left-2 bg-[#004D25]/90 text-emerald-300 text-[9px] font-black px-2 py-0.5 rounded-md border border-emerald-500/30 uppercase">
                  Grade A Beans
                </span>
              </div>
              <div className="p-2.5">
                <h3 className="text-xs font-extrabold text-white group-hover:text-[#62B62D] transition-colors">Export Silos</h3>
                <p className="text-[10px] text-slate-300 font-medium">Tema &amp; Takoradi port custody</p>
              </div>
            </div>

          </div>

          {/* Simple How to Use Section */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-4">
            <h2 className="text-sm font-black text-[#F0AD1B] uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#62B62D]" />
              <span>How To Access &amp; Use The Platform</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                <div>
                  <div className="w-6 h-6 rounded-lg bg-[#004D25] text-[#62B62D] font-black flex items-center justify-center mb-2">1</div>
                  <h3 className="font-bold text-white mb-1">Authentic Sign In</h3>
                  <p className="text-slate-400 text-[11px]">Log in with your saved credentials or click a 1-click Preset Role card (Admin, Inspector, Clerk, Farmer).</p>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                <div>
                  <div className="w-6 h-6 rounded-lg bg-[#004D25] text-[#62B62D] font-black flex items-center justify-center mb-2">2</div>
                  <h3 className="font-bold text-white mb-1">Quality &amp; Logistics</h3>
                  <p className="text-slate-400 text-[11px]">Inspect moisture/slate levels, approve produce batches, issue digital custody waybills, and trigger MoMo payouts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Key Value Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#62B62D] shrink-0" />
              <span className="font-semibold">AI Quality Grading</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Truck className="w-4 h-4 text-[#E8A817] shrink-0" />
              <span className="font-semibold">Digital Waybills</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Banknote className="w-4 h-4 text-[#62B62D] shrink-0" />
              <span className="font-semibold">MoMo Payouts</span>
            </div>
          </div>

        </div>

        {/* Right Column: Authentication Card (Login / Sign Up) */}
        <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 shrink-0">
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-[#004D25] text-white rounded-2xl shadow-sm">
              <Lock className="w-6 h-6 text-[#62B62D]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#004D25]">Portal Authorization</h2>
              <p className="text-xs text-slate-500 font-medium">Sign in to unlock AgriPulse Ghana dashboard</p>
            </div>
          </div>

          {/* Switcher Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
            <button
              onClick={() => {
                setTab('login');
                setErrorMsg(null);
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                tab === 'login' ? 'bg-[#004D25] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
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
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                tab === 'register' ? 'bg-[#004D25] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Alerts */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2 font-medium">
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

          {/* LOGIN FORM */}
          {tab === 'login' && (
            <div className="space-y-5">
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. test_inspector@agripulse.gh"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium focus:ring-2 focus:ring-[#004D25] focus:outline-none text-slate-900"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium focus:ring-2 focus:ring-[#004D25] focus:outline-none text-slate-900"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#004D25] hover:bg-[#00381B] text-white font-extrabold py-3.5 rounded-xl shadow-md text-xs transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isLoading ? 'Authenticating Credentials...' : 'Sign In To Dashboard'}</span>
                </button>
              </form>

              {/* Quick Login Presets Section */}
              <div className="border-t border-slate-200 pt-4">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                  1-Click Instant Demo Role Access
                </span>

                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  {INITIAL_USERS.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleQuickLogin(user)}
                      className="p-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-[#62B62D] rounded-xl text-left transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="truncate pr-2">
                        <div className="font-bold text-slate-800 group-hover:text-[#004D25] truncate">
                          {user.fullName}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{user.organization}</div>
                      </div>
                      <div className="flex items-center space-x-1 shrink-0">
                        <span className="text-[9px] uppercase font-bold px-2 py-0.5 bg-[#004D25] text-[#62B62D] rounded">
                          {user.role}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004D25]" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REGISTER FORM */}
          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Kwame Addo"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-[#004D25] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="kwame@agripulse.gh"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-[#004D25] focus:outline-none"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-[#004D25] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">System Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold focus:ring-2 focus:ring-[#004D25] focus:outline-none"
                  >
                    <option value="inspector">Quality Inspector</option>
                    <option value="admin">COCOBOD Admin</option>
                    <option value="clerk">Purchasing Clerk</option>
                    <option value="farmer">Producer / Farmer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Money Phone</label>
                  <input
                    type="text"
                    value={phoneMoMo}
                    onChange={(e) => setPhoneMoMo(e.target.value)}
                    placeholder="+233 24 000 0000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-[#004D25] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Organization</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Suhum Cocoa Shed"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-[#004D25] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">District / Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Suhum, Eastern Region"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-[#004D25] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 bg-[#004D25] hover:bg-[#00381B] text-white font-extrabold py-3.5 rounded-xl shadow-md text-xs transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isLoading ? 'Creating Account...' : 'Register & Enter Application'}</span>
              </button>
            </form>
          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 py-4 px-4 text-center text-slate-500 text-xs relative z-10">
        <p>AgriPulse Ghana Supply Chain Platform © 2026. All Rights Reserved.</p>
        <p className="text-[10px] text-slate-600 mt-0.5">Regulated under Ghana Cocoa Board (COCOBOD) Quality &amp; Custody Standards.</p>
      </footer>

    </div>
  );
};
