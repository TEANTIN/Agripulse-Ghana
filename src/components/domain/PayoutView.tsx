import React, { useState } from 'react';
import { ProduceBatch } from '../../types';
import { APP_IMAGES } from '../../assets/images';
import { Banknote, Smartphone, CheckCircle2, ShieldCheck, ArrowUpRight, Calculator, Loader2 } from 'lucide-react';

interface PayoutViewProps {
  batches: ProduceBatch[];
}

export const PayoutView: React.FC<PayoutViewProps> = ({ batches }) => {
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id || '');
  const [momoNumber, setMomoNumber] = useState('0244123456');
  const [momoNetwork, setMomoNetwork] = useState<'MTN Mobile Money' | 'Telecel Cash' | 'AT Money'>('MTN Mobile Money');
  const [isProcessing, setIsProcessing] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  const activeBatch = batches.find((b) => b.id === selectedBatchId) || batches[0];

  // Pricing formula
  const baseRatePerBag = activeBatch?.cropType === 'Cocoa' ? 3000 : activeBatch?.cropType === 'Cashew' ? 1450 : 620;
  const bagsCount = activeBatch?.bagsCount || 10;
  const rawSubtotal = baseRatePerBag * bagsCount;
  const qualityMultiplier = activeBatch?.grade === 'Grade 1 Premium' ? 0.05 : 0.0;
  const qualityBonus = rawSubtotal * qualityMultiplier;
  const cocobodLevy = rawSubtotal * 0.01;
  const netPayout = rawSubtotal + qualityBonus - cocobodLevy;

  const handleSimulatePayout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPayoutSuccess(false);

    setTimeout(() => {
      setIsProcessing(false);
      setPayoutSuccess(true);
    }, 1400);
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Producer Mobile Money (MoMo) Payout Calculator</h1>
            <p className="text-xs text-slate-500">
              Automated financial disbursement for farmers based on COCOBOD pricing index and AI quality grade premiums.
            </p>
          </div>
        </div>
      </div>

      {batches.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-inner">
            <Banknote className="w-6 h-6 text-[#004D25]" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No Produce Batches Available for Disbursement</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your workspace has no registered or inspected produce batches. Register a produce batch first to calculate Mobile Money payouts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Payout Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Select Batch for Disbursement</span>
            </h2>

          <form onSubmit={handleSimulatePayout} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Inspected Batch</label>
              <select
                value={selectedBatchId}
                onChange={(e) => {
                  setSelectedBatchId(e.target.value);
                  setPayoutSuccess(false);
                }}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.batchCode} &bull; {b.farmerName} ({b.bagsCount} bags - {b.grade})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Money Provider</label>
                <select
                  value={momoNetwork}
                  onChange={(e) => setMomoNetwork(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900"
                >
                  <option value="MTN Mobile Money">MTN Mobile Money (024/054/055)</option>
                  <option value="Telecel Cash">Telecel Cash (020/050)</option>
                  <option value="AT Money">AT Money (027/057)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">MoMo Wallet Phone Number</label>
                <input
                  type="text"
                  value={momoNumber}
                  onChange={(e) => setMomoNumber(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono font-bold text-slate-900"
                  required
                />
              </div>
            </div>

            {/* Price Breakdown Matrix */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2.5">
              <div className="flex justify-between text-slate-600">
                <span>Base Crop Rate ({activeBatch?.cropType}):</span>
                <span className="font-semibold text-slate-900">GHS {baseRatePerBag.toLocaleString()} / bag</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Quantity Verified:</span>
                <span className="font-semibold text-slate-900">{bagsCount} Bags ({activeBatch?.weightKg} kg)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Base Harvest Value:</span>
                <span className="font-semibold text-slate-900">GHS {rawSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Grade 1 Premium Incentive (+5%):</span>
                <span>+ GHS {qualityBonus.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>COCOBOD Producer Levy (1%):</span>
                <span>- GHS {cocobodLevy.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-300 flex justify-between items-center text-sm font-extrabold text-slate-900">
                <span>Net Producer Disbursement:</span>
                <span className="text-emerald-700 text-base">GHS {netPayout.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <button
              id="btn-trigger-momo-payout"
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Transmitting MoMo Financial Webhook...</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4 text-amber-300" />
                  <span>Disburse GHS {netPayout.toLocaleString()} via {momoNetwork}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Payout Voucher Receipt (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-300">Official Disbursement Receipt</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                COCOBOD FINANCIAL
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700 flex items-center space-x-3">
                <img 
                  src={APP_IMAGES.farmer} 
                  alt="Ghanaian Cocoa Farmer" 
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover border border-amber-400/40 shrink-0"
                />
                <div>
                  <span className="text-slate-400 block text-[11px]">Producer Name</span>
                  <span className="text-sm font-bold text-white">{activeBatch?.farmerName || 'Kwasi Bio'}</span>
                  <span className="text-[11px] text-emerald-400 block font-semibold">{activeBatch?.location || 'Goaso, Ahafo Region'}</span>
                </div>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Batch Code:</span>
                  <span className="font-mono font-bold text-amber-300">{activeBatch?.batchCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verified Grade:</span>
                  <span className="font-bold text-emerald-400">{activeBatch?.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">MoMo Account:</span>
                  <span className="font-mono text-slate-200">{momoNumber} ({momoNetwork})</span>
                </div>
              </div>

              {payoutSuccess && (
                <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-xl text-emerald-200 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Payment Dispatched Successfully!</span>
                  </div>
                  <p className="text-[11px] text-emerald-300">
                    GHS {netPayout.toLocaleString()} transferred to {momoNumber}. SMS transaction reference: <span className="font-mono font-bold">TXN-GHA-{Math.floor(100000 + Math.random() * 900000)}</span>.
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="text-[10px] text-slate-500 text-center mt-6">
            Regulated under Ghana Cocoa Board Financial Governance Rules &amp; Regulations.
          </p>
        </div>
      </div>
    )}
  </div>
);
};
