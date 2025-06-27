
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AssetDisposal as AssetDisposalType } from '@/types/asset';
import { Plus } from 'lucide-react';

const AssetDisposal = () => {
  const [disposals, setDisposals] = useState<AssetDisposalType[]>([
    {
      id: '1',
      assetId: 'OLD-LAPTOP-001',
      disposalDate: '2023-03-15',
      disposalMethod: 'Recycling',
      reason: 'End of life cycle',
      approvedBy: 'IT Manager',
      disposalValue: 0
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    assetId: '',
    disposalDate: '',
    disposalMethod: 'Sale' as AssetDisposalType['disposalMethod'],
    reason: '',
    approvedBy: '',
    disposalValue: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDisposal: AssetDisposalType = {
      ...formData,
      id: Date.now().toString()
    };
    setDisposals(prev => [...prev, newDisposal]);
    setFormData({
      assetId: '',
      disposalDate: '',
      disposalMethod: 'Sale',
      reason: '',
      approvedBy: '',
      disposalValue: 0
    });
    setShowForm(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Asset Disposal</CardTitle>
              <CardDescription>Manage asset disposal and retirement</CardDescription>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Record Disposal
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>Record Asset Disposal</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assetId">Asset ID/Code</Label>
                      <Input
                        id="assetId"
                        value={formData.assetId}
                        onChange={(e) => handleInputChange('assetId', e.target.value)}
                        placeholder="Enter asset code"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="disposalDate">Disposal Date</Label>
                      <Input
                        id="disposalDate"
                        type="date"
                        value={formData.disposalDate}
                        onChange={(e) => handleInputChange('disposalDate', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Disposal Method</Label>
                      <RadioGroup
                        value={formData.disposalMethod}
                        onValueChange={(value) => handleInputChange('disposalMethod', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Sale" id="sale" />
                          <Label htmlFor="sale">Sale</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Donation" id="donation" />
                          <Label htmlFor="donation">Donation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Recycling" id="recycling" />
                          <Label htmlFor="recycling">Recycling</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Destruction" id="destruction" />
                          <Label htmlFor="destruction">Destruction</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="disposalValue">Disposal Value</Label>
                      <Input
                        id="disposalValue"
                        type="number"
                        step="0.01"
                        value={formData.disposalValue}
                        onChange={(e) => handleInputChange('disposalValue', parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason</Label>
                      <Input
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="approvedBy">Approved By</Label>
                      <Input
                        id="approvedBy"
                        value={formData.approvedBy}
                        onChange={(e) => handleInputChange('approvedBy', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Record Disposal</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Disposal Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Disposal Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disposals.map((disposal) => (
                <TableRow key={disposal.id}>
                  <TableCell className="font-medium">{disposal.assetId}</TableCell>
                  <TableCell>{new Date(disposal.disposalDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      disposal.disposalMethod === 'Sale' ? 'bg-green-100 text-green-800' :
                      disposal.disposalMethod === 'Donation' ? 'bg-blue-100 text-blue-800' :
                      disposal.disposalMethod === 'Recycling' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {disposal.disposalMethod}
                    </span>
                  </TableCell>
                  <TableCell>{disposal.reason}</TableCell>
                  <TableCell>{disposal.approvedBy}</TableCell>
                  <TableCell>${disposal.disposalValue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetDisposal;
