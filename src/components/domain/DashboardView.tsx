import React, { useState } from 'react';
import { ProduceBatch, Waybill, WarehouseLocation, UserAccount } from '../../types';
import { AgriPulseLogo } from '../AgriPulseLogo';
import { APP_IMAGES } from '../../assets/images';
import { 
  ShieldCheck, Truck, Warehouse, Award, TrendingUp, PlusCircle, AlertTriangle, 
  ArrowUpRight, Inbox, Sparkles, Database, Loader2, CheckCircle2, User, MapPin
} from 'lucide-react';

interface DashboardViewProps {
  batches: ProduceBatch[];
  waybills: Waybill[];
  warehouses: WarehouseLocation[];
  currentUser?: UserAccount | null;
  onNavigateTab: (tab: string) => void;
  onOpenNewBatchModal: () => void;
  onLoadDemoData?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  batches,
  waybills,
  warehouses,
  currentUser,
  onNavigateTab,
  onOpenNewBatchModal,
  onLoadDemoData,
}) => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const totalWeightKg = batches.reduce((acc, b) => acc + b.weightKg, 0);
  const grade1Batches = batches.filter((b) => b.grade === 'Grade 1 Premium').length;
  const grade1Ratio = batches.length > 0 ? Math.round((grade1Batches / batches.length) * 100) : 0;
  const activeWaybills = waybills.filter((w) => w.status === 'In Transit').length;

  const handleSimulatedClick = (actionName: string, callback: () => void, delayMs = 700) => {
    setLoadingAction(actionName);
    setTimeout(() => {
      setLoadingAction(null);
      callback();
    }, delayMs);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Ghana Cocoa Market Ticker */}
      <div className="bg-[#00381B] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-[#00502B]">
        <div className="absolute right-0 top-0 bottom-0 opacity-15 pointer-events-none flex items-center pr-6">
          <AgriPulseLogo variant="mark-only" className="w-64 h-64 text-[#62B62D]" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-[#E8A817]/20 text-[#F0AD1B] text-xs px-3 py-0.5 rounded-full font-black border border-[#E8A817]/40 uppercase tracking-wide">
                Live National Produce Index
              </span>
              <span className="text-xs text-emerald-200/80 font-medium">Ghana COCOBOD Session 2025/2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>AgriPulse Quality &amp; Supply Logistics</span>
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-1.5 max-w-2xl font-medium leading-relaxed">
              End-to-end quality inspection, AI-driven produce grading, digital waybill custody, and export warehouse optimization.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              id="dashboard-btn-new-batch"
              disabled={!!loadingAction}
              onClick={() => handleSimulatedClick('new-batch', onOpenNewBatchModal, 600)}
              className="flex items-center space-x-2 bg-[#62B62D] hover:bg-[#529924] disabled:opacity-75 text-white font-extrabold px-4.5 py-3 rounded-2xl shadow-lg transition-all text-xs sm:text-sm cursor-pointer"
            >
              {loadingAction === 'new-batch' ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
              ) : (
                <PlusCircle className="w-4.5 h-4.5" />
              )}
              <span>{loadingAction === 'new-batch' ? 'Initializing Form...' : 'Register Produce Batch'}</span>
            </button>

            <button
              id="dashboard-btn-inspect"
              disabled={!!loadingAction}
              onClick={() => handleSimulatedClick('inspect', () => onNavigateTab('inspection'), 700)}
              className="flex items-center space-x-2 bg-[#E8A817] hover:bg-[#D4960E] disabled:opacity-75 text-slate-950 font-extrabold px-4.5 py-3 rounded-2xl shadow-lg transition-all text-xs sm:text-sm cursor-pointer"
            >
              {loadingAction === 'inspect' ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin text-slate-950" />
              ) : (
                <ShieldCheck className="w-4.5 h-4.5" />
              )}
              <span>{loadingAction === 'inspect' ? 'Loading AI Lab...' : 'Perform Inspection'}</span>
            </button>
          </div>
        </div>

        {/* Live Market Price Ticker Row */}
        <div className="mt-6 pt-4 border-t border-emerald-700/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/60">
            <span className="text-emerald-300 block text-[11px]">COCOA (Main Crop)</span>
            <span className="font-bold text-emerald-100 text-sm">GHS 3,000 / 64kg bag</span>
            <span className="text-emerald-400 text-[10px] flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> Guaranteed COCOBOD Rate
            </span>
          </div>
          <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/60">
            <span className="text-emerald-300 block text-[11px]">RAW CASHEW NUTS</span>
            <span className="font-bold text-emerald-100 text-sm">GHS 1,450 / 80kg bag</span>
            <span className="text-emerald-400 text-[10px] flex items-center gap-1 mt-0.5">
              <ArrowUpRight className="w-3 h-3" /> +3.2% Premium Quality
            </span>
          </div>
          <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/60">
            <span className="text-emerald-300 block text-[11px]">MAIZE (White Grain)</span>
            <span className="font-bold text-emerald-100 text-sm">GHS 620 / 50kg bag</span>
            <span className="text-amber-300 text-[10px] flex items-center gap-1 mt-0.5">
              <AlertTriangle className="w-3 h-3" /> Moisture Check Required
            </span>
          </div>
          <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/60">
            <span className="text-emerald-300 block text-[11px]">GRADE 1 PREMIUM BONUS</span>
            <span className="font-bold text-emerald-100 text-sm">+ GHS 150 / Bag</span>
            <span className="text-emerald-400 text-[10px]">AI Validated Moisture &lt;7.5%</span>
          </div>
        </div>
      </div>

      {/* HUMAN & LOGISTICS PHOTOGRAPHY SHOWCASE ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="relative h-40 overflow-hidden bg-slate-100">
            <img 
              src={APP_IMAGES.farmer} 
              alt="Ghana Cocoa Farmer" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-[#004D25]/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
              Field Producer
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <h3 className="text-sm font-black text-slate-900">Licensed Farmers &amp; Harvest Traceability</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">Direct GPS geolocation tagging at regional buying centers in Ashanti, Western, &amp; Eastern regions.</p>
            </div>
            <button
              disabled={!!loadingAction}
              onClick={() => handleSimulatedClick('payout-nav', () => onNavigateTab('payouts'), 800)}
              className="w-full mt-2 bg-emerald-50 hover:bg-emerald-100 text-[#004D25] text-xs font-bold py-2 rounded-xl border border-emerald-200/80 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              {loadingAction === 'payout-nav' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              <span>Producer MoMo Disburse &rarr;</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="relative h-40 overflow-hidden bg-slate-100">
            <img 
              src={APP_IMAGES.inspector} 
              alt="Ghana Quality Control Inspector" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-[#E8A817] text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
              COCOBOD QC Lab
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <h3 className="text-sm font-black text-slate-900">AI Optical Quality Grading</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">Digital moisture meters, bean count calibration, and Gemini 3.7 AI defect detection.</p>
            </div>
            <button
              disabled={!!loadingAction}
              onClick={() => handleSimulatedClick('qc-nav', () => onNavigateTab('inspection'), 800)}
              className="w-full mt-2 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold py-2 rounded-xl border border-amber-200/80 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              {loadingAction === 'qc-nav' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              <span>Run AI QC Test &rarr;</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="relative h-40 overflow-hidden bg-slate-100">
            <img 
              src={APP_IMAGES.logistics} 
              alt="Freight Logistics Truck" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-blue-700 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
              Fleet Transport
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <h3 className="text-sm font-black text-slate-900">Digital Custody Waybills</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">Cryptographic QR codes signed upon departure from inland depots to Tema/Takoradi export silos.</p>
            </div>
            <button
              disabled={!!loadingAction}
              onClick={() => handleSimulatedClick('waybill-nav', () => onNavigateTab('waybills'), 800)}
              className="w-full mt-2 bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold py-2 rounded-xl border border-blue-200/80 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              {loadingAction === 'waybill-nav' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              <span>Issue Waybill &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* NEW USER / EMPTY STATE WELCOME BANNER */}
      {batches.length === 0 && (
        <div className="bg-gradient-to-r from-emerald-900 via-[#004D25] to-teal-900 rounded-3xl p-6 text-white border border-emerald-600/50 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-800/60 border border-emerald-500/40 text-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#E8A817]" />
              <span>Clean Account Workspace Ready</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Welcome, {currentUser ? currentUser.fullName : 'Account User'}!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              You are currently viewing a clean workspace with no produce batches or waybills recorded yet. Add your own data by registering a produce batch, or load our sample demonstration dataset anytime.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              disabled={!!loadingAction}
              onClick={() => handleSimulatedClick('empty-batch', onOpenNewBatchModal, 600)}
              className="flex items-center space-x-2 bg-[#62B62D] hover:bg-[#529924] text-white font-extrabold px-4 py-2.5 rounded-xl shadow-md text-xs transition-all cursor-pointer"
            >
              {loadingAction === 'empty-batch' ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
              <span>+ Register Produce Batch</span>
            </button>

            {onLoadDemoData && (
              <button
                disabled={!!loadingAction}
                onClick={() => handleSimulatedClick('demo-data', onLoadDemoData, 1200)}
                className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl shadow-md text-xs transition-all cursor-pointer"
              >
                {loadingAction === 'demo-data' ? <Loader2 className="w-4 h-4 animate-spin text-slate-950" /> : <Database className="w-4 h-4" />}
                <span>{loadingAction === 'demo-data' ? 'Seeding Sample Data...' : 'Load Sample Demo Dataset'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Registered Weight</span>
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900">{(totalWeightKg / 1000).toFixed(1)} MT</span>
            <span className="text-xs text-slate-500 ml-2">({batches.length} active batches)</span>
          </div>
          <p className="text-xs text-emerald-600 mt-2 font-medium">
            {batches.length > 0 ? '98.2% Export-Ready Classification' : 'Workspace Ready For First Batch'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade 1 Premium Ratio</span>
            <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900">{grade1Ratio}%</span>
            <span className="text-xs text-slate-500 ml-2">({grade1Batches} Grade 1)</span>
          </div>
          <p className="text-xs text-amber-600 mt-2 font-medium">COCOBOD Benchmark &gt; 85% Target</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Waybills in Transit</span>
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900">{activeWaybills}</span>
            <span className="text-xs text-slate-500 ml-2">({waybills.length} total generated)</span>
          </div>
          <p className="text-xs text-blue-600 mt-2 font-medium">GPS Tracked &amp; QR Signed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Warehouse Capacity</span>
            <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
              <Warehouse className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900">
              {Math.round((warehouses.reduce((a, w) => a + w.currentBags, 0) / warehouses.reduce((a, w) => a + w.capacityBags, 0)) * 100)}%
            </span>
            <span className="text-xs text-slate-500 ml-2">(3 Terminals)</span>
          </div>
          <p className="text-xs text-purple-600 mt-2 font-medium">Tema &amp; Takoradi Silos Optimal</p>
        </div>

      </div>

      {/* Main Content Layout: Batches Ledger & Quick Warehouse Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Batches Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Registered Produce Batches</h2>
              <p className="text-xs text-slate-500">Live quality ledger &amp; AI inspection records</p>
            </div>
            {batches.length > 0 && (
              <button
                disabled={!!loadingAction}
                onClick={() => handleSimulatedClick('view-all', () => onNavigateTab('batches'), 600)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer flex items-center gap-1"
              >
                {loadingAction === 'view-all' ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                <span>View All Batches &rarr;</span>
              </button>
            )}
          </div>

          {batches.length === 0 ? (
            <div className="py-12 px-4 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-inner">
                <Inbox className="w-6 h-6 text-[#004D25]" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No Produce Batches Registered</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your account database is clean. Click below to add your first cocoa batch or populate sample demo records.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  disabled={!!loadingAction}
                  onClick={() => handleSimulatedClick('btn-batch-modal', onOpenNewBatchModal, 600)}
                  className="bg-[#004D25] hover:bg-[#00381B] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {loadingAction === 'btn-batch-modal' ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                  <span>+ Register Batch</span>
                </button>
                {onLoadDemoData && (
                  <button
                    disabled={!!loadingAction}
                    onClick={() => handleSimulatedClick('btn-demo-load', onLoadDemoData, 1200)}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {loadingAction === 'btn-demo-load' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                    <span>Load Sample Data</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Batch &amp; Seed Image</th>
                    <th className="py-2.5 px-3">Farmer &amp; Location</th>
                    <th className="py-2.5 px-3">Crop / Weight</th>
                    <th className="py-2.5 px-3">Moisture %</th>
                    <th className="py-2.5 px-3">Grade</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {batches.map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          {batch.seedImageUrl ? (
                            <div className="w-9 h-9 rounded-lg overflow-hidden border border-emerald-500/40 shrink-0 relative shadow-sm">
                              <img 
                                src={batch.seedImageUrl} 
                                alt={`Seed photo for ${batch.batchCode}`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center text-slate-400">
                              <Inbox className="w-4 h-4" />
                            </div>
                          )}
                          <span className="font-mono font-bold text-slate-900 text-xs">{batch.batchCode}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-800 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{batch.farmerName}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{batch.location}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{batch.cropType}</div>
                        <div className="text-[11px] text-slate-500">{batch.weightKg} kg ({batch.bagsCount} bags)</div>
                      </td>
                      <td className="py-3 px-3 font-semibold">
                        <span className={batch.moistureContent <= 7.5 ? 'text-emerald-700' : 'text-amber-600 font-bold'}>
                          {batch.moistureContent}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            batch.grade === 'Grade 1 Premium'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : batch.grade === 'Grade 2 Standard'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : batch.grade === 'Sub-Standard'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {batch.grade}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[11px] text-slate-600 font-medium">{batch.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Warehouse Status & Quick Actions Sidebar */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Warehouse Storage Status</h3>
              <button 
                disabled={!!loadingAction}
                onClick={() => handleSimulatedClick('warehouses-nav', () => onNavigateTab('warehouses'), 600)} 
                className="text-xs text-emerald-700 font-semibold cursor-pointer flex items-center gap-1"
              >
                {loadingAction === 'warehouses-nav' ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                <span>Manage Silos &rarr;</span>
              </button>
            </div>

            <div className="space-y-3">
              {warehouses.map((wh) => {
                const fillPercent = Math.round((wh.currentBags / wh.capacityBags) * 100);
                return (
                  <div key={wh.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                      <span>{wh.name}</span>
                      <span className={fillPercent > 85 ? 'text-amber-600' : 'text-emerald-600'}>{fillPercent}% Capacity</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1.5">
                      <div
                        className={`h-full rounded-full transition-all ${
                          fillPercent > 85 ? 'bg-amber-500' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${fillPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                      <span>{wh.currentBags.toLocaleString()} / {wh.capacityBags.toLocaleString()} bags</span>
                      <span>Temp: {wh.temperatureC}°C | Humidity: {wh.humidityPercentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rapid Quality Grading Quick Card */}
          <div className="bg-gradient-to-br from-amber-500/10 to-emerald-500/10 border border-amber-300/60 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-amber-950 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>COCOBOD Quality Assurance Checklist</span>
            </h3>
            <ul className="text-xs text-amber-900 space-y-1.5 mt-2">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                <span>Moisture must be ≤ 7.5% for export bag sealing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                <span>Maximum 3% moldy / defective beans for Grade 1</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                <span>Bean count standard: 100g = 90-105 cocoa beans</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};

