
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Asset } from '@/types/asset';
import { Plus, Edit, Eye } from 'lucide-react';
import AssetForm from './AssetForm';
import AssetDetails from './AssetDetails';

const AssetIdentification = () => {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      assetName: 'Dell Laptop XPS 13',
      assetType: 'IT Equipment',
      newCode: 'DELL-XPS-001',
      deviceId: 'XPS13-2023-001',
      purchaseDate: '2023-01-15',
      currentCondition: 'Excellent',
      status: 'Active',
      remarks: 'Assigned to development team',
      vendorName: 'Dell Technologies',
      costValue: 1500,
      originallyIssuedTo: 'John Doe',
      currentlyIssuedTo: 'John Doe',
      department: 'IT Department',
      location: 'Office Floor 2',
      conditionAtAssignment: 'New',
      dateOfIssue: '2023-01-20',
      maintenanceHistory: []
    },
    {
      id: '2',
      assetName: 'Office Chair Ergonomic',
      assetType: 'Furniture & Fixtures',
      newCode: 'CHAIR-ERG-002',
      deviceId: 'CHAIR-001',
      purchaseDate: '2023-02-10',
      currentCondition: 'Good',
      status: 'Active',
      remarks: 'Standard office chair',
      vendorName: 'Office Furniture Co',
      costValue: 250,
      originallyIssuedTo: 'Jane Smith',
      currentlyIssuedTo: 'Jane Smith',
      department: 'HR Department',
      location: 'Office Floor 1',
      conditionAtAssignment: 'New',
      dateOfIssue: '2023-02-15',
      maintenanceHistory: []
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'form' | 'details'>('list');

  const handleAddAsset = (asset: Asset) => {
    setAssets(prev => [...prev, { ...asset, id: Date.now().toString() }]);
    setShowForm(false);
    setViewMode('list');
  };

  const handleEditAsset = (asset: Asset) => {
    setAssets(prev => prev.map(a => a.id === asset.id ? asset : a));
    setSelectedAsset(null);
    setViewMode('list');
  };

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setViewMode('details');
  };

  const handleEdit = (asset: Asset) => {
    setSelectedAsset(asset);
    setViewMode('form');
  };

  if (viewMode === 'form') {
    return (
      <AssetForm
        asset={selectedAsset}
        onSave={selectedAsset ? handleEditAsset : handleAddAsset}
        onCancel={() => {
          setSelectedAsset(null);
          setViewMode('list');
        }}
      />
    );
  }

  if (viewMode === 'details' && selectedAsset) {
    return (
      <AssetDetails
        asset={selectedAsset}
        onEdit={() => setViewMode('form')}
        onBack={() => {
          setSelectedAsset(null);
          setViewMode('list');
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Asset Identification & Allocation</CardTitle>
              <CardDescription>Manage and track all organizational assets</CardDescription>
            </div>
            <Button onClick={() => setViewMode('form')}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Asset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Currently Issued To</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.assetName}</TableCell>
                  <TableCell>{asset.assetType}</TableCell>
                  <TableCell>{asset.newCode}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      asset.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {asset.status}
                    </span>
                  </TableCell>
                  <TableCell>{asset.currentlyIssuedTo}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(asset)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(asset)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetIdentification;
