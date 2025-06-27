
export interface Asset {
  id: string;
  // Asset Information
  assetName: string;
  assetType: 'IT Equipment' | 'Furniture & Fixtures' | 'Office Supplies' | 'Small Tools';
  newCode: string; // name-brand-number format
  deviceId: string;
  purchaseDate: string;
  
  // Asset Condition and Status
  currentCondition: string;
  status: 'Active' | 'Inactive';
  remarks: string;
  
  // Purchase Details
  vendorName: string;
  costValue: number;
  
  // Asset Assignment and Location
  originallyIssuedTo: string;
  currentlyIssuedTo: string;
  department: string;
  location: string;
  conditionAtAssignment: string;
  dateOfIssue: string;
  maintenanceHistory: MaintenanceRecord[];
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  description: string;
  cost: number;
  technician: string;
}

export interface AssetMovement {
  id: string;
  assetId: string;
  fromLocation: string;
  toLocation: string;
  fromUser: string;
  toUser: string;
  movementDate: string;
  reason: string;
  approvedBy: string;
}

export interface AssetDisposal {
  id: string;
  assetId: string;
  disposalDate: string;
  disposalMethod: 'Sale' | 'Donation' | 'Recycling' | 'Destruction';
  reason: string;
  approvedBy: string;
  disposalValue: number;
}
