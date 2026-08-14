import React, { useState } from 'react';
import { WarehouseLocation } from '../../types';
import { APP_IMAGES } from '../../assets/images';
import { Warehouse, Thermometer, Droplets, ShieldAlert, CheckCircle, ArrowUpRight, RefreshCw, Loader2 } from 'lucide-react';

interface WarehouseViewProps {
  warehouses: WarehouseLocation[];
}

export const WarehouseView: React.FC<WarehouseViewProps> = ({ warehouses }) => {
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSyncTelemetry = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 space-y-1">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-purple-100 text-purple-800 rounded-xl">
              <Warehouse className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Climate-Controlled Warehouse &amp; Silo Management</h1>
              <p className="text-xs text-slate-500">
                Real-time telemetry monitoring temperature, relative humidity, and storage bag capacities across Ghana export terminals.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <span className="bg-purple-50 text-purple-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-purple-200">
              COCOBOD Silo Network
            </span>
            <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
              IoT Telemetry Live
            </span>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden h-24 border border-slate-200 shadow-sm hidden md:block">
          <img 
            src={APP_IMAGES.beans} 
            alt="Export Warehouse Silo Storage" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-2">
            <span className="text-white text-[10px] font-bold">Tema Port Terminal Shed 4</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {warehouses.map((wh) => {
          const fillPercentage = Math.round((wh.currentBags / wh.capacityBags) * 100);
          const isSyncing = syncingId === wh.id;

          return (
            <div key={wh.id} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{wh.name}</h3>
                  <span className="text-xs text-slate-500">{wh.region} Region</span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    wh.status === 'Optimal'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {wh.status}
                </span>
              </div>

              {/* Storage Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Silo Capacity Fill</span>
                  <span className={fillPercentage > 85 ? 'text-amber-600 font-bold' : 'text-emerald-700 font-bold'}>
                    {fillPercentage}% ({wh.currentBags.toLocaleString()} / {wh.capacityBags.toLocaleString()} bags)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all ${
                      fillPercentage > 85 ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${fillPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Climate Telemetry Monitors */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center space-x-3">
                  <Thermometer className="w-5 h-5 text-rose-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Temperature</span>
                    <span className="text-sm font-extrabold text-slate-900">{wh.temperatureC}°C</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center space-x-3">
                  <Droplets className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Humidity</span>
                    <span className="text-sm font-extrabold text-slate-900">{wh.humidityPercentage}% RH</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                <span>Aeration Fans: Active</span>
                <button
                  onClick={() => handleSyncTelemetry(wh.id)}
                  disabled={isSyncing}
                  className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                      <span>Calibrating...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Sync Sensor</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
