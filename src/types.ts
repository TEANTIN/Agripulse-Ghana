export type UserRole = 'admin' | 'inspector' | 'clerk' | 'farmer';

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  role: UserRole;
  organization: string;
  location: string;
  phoneMoMo?: string;
  badgeId: string;
  createdAt: string;
}

export interface ProduceBatch {
  id: string;
  batchCode: string;
  farmerName: string;
  location: string;
  region: 'Ashanti' | 'Western' | 'Eastern' | 'Central' | 'Brong-Ahafo' | 'Volta';
  cropType: 'Cocoa' | 'Cashew' | 'Maize' | 'Sheanut' | 'Coffee';
  weightKg: number;
  bagsCount: number;
  moistureContent: number; // e.g. 7.2%
  moldPercentage: number;
  defectPercentage: number;
  slatePercentage: number;
  beanCountPer100g: number;
  grade: 'Grade 1 Premium' | 'Grade 2 Standard' | 'Sub-Standard' | 'Pending Inspection';
  status: 'Registered' | 'Inspected' | 'In Transit' | 'Warehouse Stored' | 'Export Dispatched';
  assignedInspector: string;
  seedImageUrl?: string;
  aiNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Waybill {
  id: string;
  waybillNumber: string;
  batchId: string;
  batchCode: string;
  cropType: string;
  quantityBags: number;
  originDepot: string;
  destinationWarehouse: string;
  driverName: string;
  truckReg: string;
  status: 'Pending Dispatch' | 'In Transit' | 'Received at Warehouse' | 'Flagged Discrepancy';
  dispatchedAt: string;
  estimatedArrival: string;
  receivedAt?: string;
}

export interface WarehouseLocation {
  id: string;
  name: string;
  region: string;
  capacityBags: number;
  currentBags: number;
  temperatureC: number;
  humidityPercentage: number;
  status: 'Optimal' | 'Warning' | 'Full';
}

