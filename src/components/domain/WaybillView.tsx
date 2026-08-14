import React, { useState } from 'react';
import { Waybill, ProduceBatch, WarehouseLocation } from '../../types';
import { APP_IMAGES } from '../../assets/images';
import { Truck, QrCode, PlusCircle, CheckCircle, Clock, MapPin, ShieldCheck, X, Loader2 } from 'lucide-react';

interface WaybillViewProps {
  waybills: Waybill[];
  batches: ProduceBatch[];
  warehouses: WarehouseLocation[];
  onAddWaybill: (waybill: Partial<Waybill>) => void;
}

export const WaybillView: React.FC<WaybillViewProps> = ({
  waybills,
  batches,
  warehouses,
  onAddWaybill,
}) => {
  const [selectedWaybill, setSelectedWaybill] = useState<Waybill | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [batchId, setBatchId] = useState(batches[0]?.id || '');
  const [originDepot, setOriginDepot] = useState('Suhum Cocoa Depot Shed B');
  const [destinationWarehouse, setDestinationWarehouse] = useState(warehouses[0]?.name || 'Tema Port Terminal Alpha');
  const [driverName, setDriverName] = useState('Kwame Boateng');
  const [truckReg, setTruckReg] = useState('GT 9201-25');
  const [quantityBags, setQuantityBags] = useState(35);

  const handleCreateWaybill = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const batch = batches.find((b) => b.id === batchId) || batches[0];
      onAddWaybill({
        batchId: batch?.id || 'batch-000',
        batchCode: batch?.batchCode || 'GHA-PRD-2026-0000',
        cropType: batch?.cropType || 'Cocoa',
        quantityBags,
        originDepot,
        destinationWarehouse,
        driverName,
        truckReg,
      });
      setIsSubmitting(false);
      setShowModal(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Row with Logistics Showcase */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 space-y-1">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-600" />
            <span>Digital Custody Waybills &amp; Transit Logistics</span>
          </h1>
          <p className="text-xs text-slate-500">
            Generate QR-code verified transit waybills from farmgate depots to export harbor silos with real-time GPS tracking.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="bg-blue-50 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-blue-200">
              Active Fleet: 14 Haulage Trucks
            </span>
            <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
              Tema Port Corridor Ready
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative rounded-2xl overflow-hidden h-24 w-full border border-slate-200 shadow-sm hidden md:block">
            <img 
              src={APP_IMAGES.logistics} 
              alt="Logistics Haulage Truck" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-2">
              <span className="text-white text-[10px] font-bold">Ghana Port Corridor Haulage</span>
            </div>
          </div>

          <button
            id="btn-dispatch-waybill"
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-3 rounded-xl text-xs transition-all shadow cursor-pointer shrink-0 w-full md:w-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Dispatch New Waybill</span>
          </button>
        </div>
      </div>

      {/* Waybills Grid / Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
        {waybills.length === 0 ? (
          <div className="py-12 px-4 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-inner">
              <Truck className="w-6 h-6 text-[#004D25]" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No Custody Waybills Generated Yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              There are no active or completed transit waybills recorded for this account. Dispatch a new waybill to track farmgate to port shipments.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-2 inline-flex items-center space-x-2 bg-[#004D25] hover:bg-[#00381B] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Dispatch New Waybill</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Waybill #</th>
                  <th className="py-2.5 px-3">Batch Reference</th>
                  <th className="py-2.5 px-3">Route (Origin &rarr; Destination)</th>
                  <th className="py-2.5 px-3">Driver & Truck</th>
                  <th className="py-2.5 px-3">Quantity</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">QR Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {waybills.map((wb) => (
                  <tr key={wb.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{wb.waybillNumber}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{wb.batchCode}</div>
                      <div className="text-[11px] text-slate-500">{wb.cropType}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1 text-slate-900 font-medium">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{wb.originDepot}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 pl-4">&rarr; {wb.destinationWarehouse}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800">{wb.driverName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{wb.truckReg}</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">{wb.quantityBags} Bags</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          wb.status === 'Received at Warehouse'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-blue-100 text-blue-800 border border-blue-300'
                        }`}
                      >
                        {wb.status === 'Received at Warehouse' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3 animate-spin" />
                        )}
                        <span>{wb.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedWaybill(wb)}
                        className="inline-flex items-center space-x-1 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border border-slate-200"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Inspect Digital QR</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QR Code Inspection Drawer / Modal */}
      {selectedWaybill && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedWaybill(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Digital Custody Signature
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">{selectedWaybill.waybillNumber}</h3>
              <p className="text-xs text-slate-500">{selectedWaybill.batchCode} &bull; {selectedWaybill.quantityBags} Bags</p>
            </div>

            {/* Simulated Barcode / QR Code payload */}
            <div className="my-6 bg-slate-900 p-6 rounded-2xl text-center space-y-3">
              <div className="mx-auto w-36 h-36 bg-white p-3 rounded-xl shadow-inner flex flex-col items-center justify-center">
                <QrCode className="w-28 h-28 text-slate-900" />
              </div>
              <div className="font-mono text-[10px] text-emerald-400 break-all bg-slate-950 p-2 rounded border border-slate-800">
                PAYLOAD: {JSON.stringify({ wb: selectedWaybill.waybillNumber, driver: selectedWaybill.driverName, reg: selectedWaybill.truckReg })}
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Driver Name:</span>
                <span className="font-semibold text-slate-900">{selectedWaybill.driverName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Truck Registration:</span>
                <span className="font-mono font-bold text-slate-900">{selectedWaybill.truckReg}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination:</span>
                <span className="font-medium text-slate-900">{selectedWaybill.destinationWarehouse}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedWaybill(null)}
              className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
            >
              Close Inspection Window
            </button>
          </div>
        </div>
      )}

      {/* Dispatch Waybill Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                <span>Dispatch Produce Waybill</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWaybill} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Inspected Batch</label>
                <select
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.batchCode} ({b.cropType} - {b.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Origin Depot</label>
                  <input
                    type="text"
                    value={originDepot}
                    onChange={(e) => setOriginDepot(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Warehouse</label>
                  <select
                    value={destinationWarehouse}
                    onChange={(e) => setDestinationWarehouse(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2 font-medium"
                  >
                    {warehouses.map((w) => (
                      <option key={w.id} value={w.name}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Driver Name</label>
                  <input
                    type="text"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Truck Registration</label>
                  <input
                    type="text"
                    value={truckReg}
                    onChange={(e) => setTruckReg(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bags Quantity</label>
                <input
                  type="number"
                  value={quantityBags}
                  onChange={(e) => setQuantityBags(Number(e.target.value))}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold"
                  min="1"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Transmitting Custody Signature...</span>
                    </>
                  ) : (
                    <span>Issue Digital Waybill</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
