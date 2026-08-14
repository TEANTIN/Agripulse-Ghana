import React, { useState, useEffect } from 'react';
import { UserRole, UserAccount, ProduceBatch, Waybill, WarehouseLocation } from './types';
import { INITIAL_BATCHES, INITIAL_WAYBILLS, WAREHOUSES, INITIAL_USERS } from './data/mockData';
import { HeaderNav } from './components/HeaderNav';
import { DashboardView } from './components/domain/DashboardView';
import { InspectionView } from './components/domain/InspectionView';
import { WaybillView } from './components/domain/WaybillView';
import { WarehouseView } from './components/domain/WarehouseView';
import { PayoutView } from './components/domain/PayoutView';
import { AuthModal } from './components/AuthModal';
import { ExitConfirmModal } from './components/ExitConfirmModal';
import { LandingAuthView } from './components/LandingAuthView';
import { LayoutDashboard, ShieldCheck, Truck, Warehouse, Banknote, X, PlusCircle } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('agripulse_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('agripulse_active_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.role || 'admin';
      }
    } catch (e) {}
    return 'admin';
  });

  const [domainTab, setDomainTab] = useState<'dashboard' | 'inspection' | 'waybills' | 'warehouses' | 'payout'>('dashboard');

  const [batches, setBatches] = useState<ProduceBatch[]>(INITIAL_BATCHES);
  const [waybills, setWaybills] = useState<Waybill[]>(INITIAL_WAYBILLS);
  const [warehouses, setWarehouses] = useState<WarehouseLocation[]>(WAREHOUSES);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNewBatchModalOpen, setIsNewBatchModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    try {
      localStorage.setItem('agripulse_active_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (currentUser) {
      const updatedUser = { ...currentUser, role };
      setCurrentUser(updatedUser);
      try {
        localStorage.setItem('agripulse_active_user', JSON.stringify(updatedUser));
      } catch (e) {}
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('agripulse_active_user');
    } catch (e) {}
  };

  // New Batch Form State
  const [farmerName, setFarmerName] = useState('');
  const [location, setLocation] = useState('');
  const [cropType, setCropType] = useState<'Cocoa' | 'Cashew' | 'Maize' | 'Sheanut'>('Cocoa');
  const [weightKg, setWeightKg] = useState(2000);
  const [region, setRegion] = useState<'Ashanti' | 'Western' | 'Eastern' | 'Central' | 'Brong-Ahafo' | 'Volta'>('Ashanti');

  // Sync batches and waybills based on current logged in user
  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    const savedBatches = localStorage.getItem(`agripulse_user_batches_${currentUser.id}`);
    const savedWaybills = localStorage.getItem(`agripulse_user_waybills_${currentUser.id}`);

    const isPresetDemoUser = INITIAL_USERS.some((u) => u.id === currentUser.id);

    if (savedBatches) {
      try {
        setBatches(JSON.parse(savedBatches));
      } catch (e) {
        setBatches([]);
      }
    } else if (isPresetDemoUser) {
      setBatches(INITIAL_BATCHES);
    } else {
      // Newly created accounts start with an empty dashboard state
      setBatches([]);
    }

    if (savedWaybills) {
      try {
        setWaybills(JSON.parse(savedWaybills));
      } catch (e) {
        setWaybills([]);
      }
    } else if (isPresetDemoUser) {
      setWaybills(INITIAL_WAYBILLS);
    } else {
      setWaybills([]);
    }
  }, [currentUser?.id]);

  const handleLoadDemoData = () => {
    setBatches(INITIAL_BATCHES);
    setWaybills(INITIAL_WAYBILLS);
    if (currentUser?.id) {
      try {
        localStorage.setItem(`agripulse_user_batches_${currentUser.id}`, JSON.stringify(INITIAL_BATCHES));
        localStorage.setItem(`agripulse_user_waybills_${currentUser.id}`, JSON.stringify(INITIAL_WAYBILLS));
      } catch (e) {}
    }
  };

  const handleAddBatch = (newBatchData: Partial<ProduceBatch>) => {
    const newBatch: ProduceBatch = {
      id: `batch-${Date.now()}`,
      batchCode: `GHA-${(newBatchData.cropType || 'PRD').slice(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerName: newBatchData.farmerName || 'Kwame Mensah',
      location: newBatchData.location || 'Suhum, Eastern Region',
      region: newBatchData.region || 'Eastern',
      cropType: (newBatchData.cropType as any) || 'Cocoa',
      weightKg: newBatchData.weightKg || 2000,
      bagsCount: Math.round((newBatchData.weightKg || 2000) / 64),
      moistureContent: newBatchData.moistureContent || 7.2,
      moldPercentage: newBatchData.moldPercentage || 1.2,
      defectPercentage: newBatchData.defectPercentage || 1.4,
      slatePercentage: newBatchData.slatePercentage || 1.8,
      beanCountPer100g: newBatchData.beanCountPer100g || 96,
      grade: newBatchData.grade || 'Pending Inspection',
      status: newBatchData.status || 'Registered',
      assignedInspector: currentUser?.fullName || 'Insp. Samuel Osei',
      aiNotes: newBatchData.aiNotes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedBatches = [newBatch, ...batches];
    setBatches(updatedBatches);
    if (currentUser?.id) {
      try {
        localStorage.setItem(`agripulse_user_batches_${currentUser.id}`, JSON.stringify(updatedBatches));
      } catch (e) {}
    }

    // Send to backend API asynchronously
    fetch('/api/batches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBatch),
    }).catch((err) => console.error('Error persisting batch:', err));
  };

  const handleCreateNewBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddBatch({
      farmerName,
      location,
      cropType,
      weightKg,
      region,
      status: 'Registered',
      grade: 'Pending Inspection',
    });
    setIsNewBatchModalOpen(false);
    setFarmerName('');
    setLocation('');
  };

  const handleAddWaybill = (waybillData: Partial<Waybill>) => {
    const newWaybill: Waybill = {
      id: `wb-${Date.now()}`,
      waybillNumber: `WB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      batchId: waybillData.batchId || batches[0]?.id || 'batch-001',
      batchCode: waybillData.batchCode || batches[0]?.batchCode || 'GHA-COC-2026-0811',
      cropType: waybillData.cropType || 'Cocoa',
      quantityBags: waybillData.quantityBags || 25,
      originDepot: waybillData.originDepot || 'Suhum Cocoa Depot',
      destinationWarehouse: waybillData.destinationWarehouse || 'Tema Port Terminal Alpha',
      driverName: waybillData.driverName || 'Emmanuel Kwarteng',
      truckReg: waybillData.truckReg || 'GT 8842-24',
      status: 'In Transit',
      dispatchedAt: new Date().toISOString(),
      estimatedArrival: new Date(Date.now() + 3600 * 4 * 1000).toISOString(),
    };

    const updatedWaybills = [newWaybill, ...waybills];
    setWaybills(updatedWaybills);
    if (currentUser?.id) {
      try {
        localStorage.setItem(`agripulse_user_waybills_${currentUser.id}`, JSON.stringify(updatedWaybills));
      } catch (e) {}
    }

    fetch('/api/waybills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWaybill),
    }).catch((err) => console.error('Error persisting waybill:', err));
  };

  if (!currentUser) {
    return <LandingAuthView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* Top Application Header */}
      <HeaderNav
        currentRole={currentRole}
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={() => setIsLogoutConfirmOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          
          {/* Domain App Sub-Navigation */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-sm flex space-x-1 overflow-x-auto">
            
            <button
              id="domain-tab-dashboard"
              onClick={() => setDomainTab('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                domainTab === 'dashboard' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview Dashboard</span>
            </button>

            <button
              id="domain-tab-inspection"
              onClick={() => setDomainTab('inspection')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                domainTab === 'inspection' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>AI Quality Inspection</span>
            </button>

            <button
              id="domain-tab-waybills"
              onClick={() => setDomainTab('waybills')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                domainTab === 'waybills' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Custody Waybills</span>
            </button>

            <button
              id="domain-tab-warehouses"
              onClick={() => setDomainTab('warehouses')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                domainTab === 'warehouses' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Warehouse className="w-4 h-4" />
              <span>Warehouse Silos</span>
            </button>

            <button
              id="domain-tab-payout"
              onClick={() => setDomainTab('payout')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                domainTab === 'payout' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Banknote className="w-4 h-4" />
              <span>Producer MoMo Payouts</span>
            </button>

          </div>

          {/* Sub-View Content */}
          {domainTab === 'dashboard' && (
            <DashboardView
              batches={batches}
              waybills={waybills}
              warehouses={warehouses}
              currentUser={currentUser}
              onNavigateTab={(tab) => setDomainTab(tab as any)}
              onOpenNewBatchModal={() => setIsNewBatchModalOpen(true)}
              onLoadDemoData={handleLoadDemoData}
            />
          )}

          {domainTab === 'inspection' && (
            <InspectionView batches={batches} onAddBatch={handleAddBatch} />
          )}

          {domainTab === 'waybills' && (
            <WaybillView
              waybills={waybills}
              batches={batches}
              warehouses={warehouses}
              onAddWaybill={handleAddWaybill}
            />
          )}

          {domainTab === 'warehouses' && <WarehouseView warehouses={warehouses} />}

          {domainTab === 'payout' && <PayoutView batches={batches} />}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-200">AgriPulse Ghana</span> &bull; Smart Cocoa Supply Chain &amp; Quality Logistics
            <p className="text-slate-500 text-[11px] mt-0.5">Official Produce Inspection, Custody Tracking, and MoMo Disbursement System</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Gemini AI Active
            </span>
          </div>
        </div>
      </footer>

      {/* New Produce Batch Modal */}
      {isNewBatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <span>Register Farmgate Produce Batch</span>
              </h3>
              <button onClick={() => setIsNewBatchModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewBatchSubmit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Farmer / Producer Name</label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder="e.g. Kwaku Osei"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Depot / Village Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Suhum, Eastern Region"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Crop Type</label>
                  <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                  >
                    <option value="Cocoa">Ghana Cocoa</option>
                    <option value="Cashew">Cashew Nuts</option>
                    <option value="Maize">White Maize</option>
                    <option value="Sheanut">Sheanuts</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Weight (Kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                    min="100"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewBatchModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow">
                  Register Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Authentication & Account Creation Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Exit & Logout Confirmation Modal with Mock Platform Loader */}
      <ExitConfirmModal
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirmExit={handleLogout}
        currentUser={currentUser}
        currentRole={currentRole}
      />

    </div>
  );
}
