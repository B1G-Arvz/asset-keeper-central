
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Asset } from '@/types/asset';
import { ArrowLeft, Edit } from 'lucide-react';

interface AssetDetailsProps {
  asset: Asset;
  onEdit: () => void;
  onBack: () => void;
}

const AssetDetails = ({ asset, onEdit, onBack }: AssetDetailsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <CardTitle>{asset.assetName}</CardTitle>
                <CardDescription>Asset Details</CardDescription>
              </div>
            </div>
            <Button onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Asset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Asset Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Asset Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Asset Name</p>
                <p className="text-sm">{asset.assetName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Asset Type</p>
                <p className="text-sm">{asset.assetType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">New Code</p>
                <p className="text-sm">{asset.newCode}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Device ID/Serial No.</p>
                <p className="text-sm">{asset.deviceId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Purchase Date</p>
                <p className="text-sm">{new Date(asset.purchaseDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Asset Condition and Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Asset Condition and Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Current Condition</p>
                <p className="text-sm">{asset.currentCondition}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                  asset.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {asset.status}
                </span>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Remarks</p>
                <p className="text-sm">{asset.remarks || 'No remarks'}</p>
              </div>
            </div>
          </div>

          {/* Purchase Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Purchase Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Vendor Name</p>
                <p className="text-sm">{asset.vendorName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cost/Value</p>
                <p className="text-sm">${asset.costValue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Asset Assignment and Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Asset Assignment and Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Originally Issued To</p>
                <p className="text-sm">{asset.originallyIssuedTo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Currently Issued To</p>
                <p className="text-sm">{asset.currentlyIssuedTo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="text-sm">{asset.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-sm">{asset.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Condition at Assignment</p>
                <p className="text-sm">{asset.conditionAtAssignment}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date of Issue</p>
                <p className="text-sm">{new Date(asset.dateOfIssue).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Maintenance History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Maintenance History</h3>
            {asset.maintenanceHistory.length > 0 ? (
              <div className="space-y-2">
                {asset.maintenanceHistory.map((record) => (
                  <div key={record.id} className="border rounded p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">{record.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(record.date).toLocaleDateString()} - {record.technician}
                        </p>
                      </div>
                      <p className="text-sm font-medium">${record.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No maintenance records</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetDetails;
