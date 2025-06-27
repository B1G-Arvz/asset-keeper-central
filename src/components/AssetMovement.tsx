
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AssetMovement as AssetMovementType } from '@/types/asset';
import { Plus } from 'lucide-react';

const AssetMovement = () => {
  const [movements, setMovements] = useState<AssetMovementType[]>([
    {
      id: '1',
      assetId: '1',
      fromLocation: 'Storage Room',
      toLocation: 'Office Floor 2',
      fromUser: 'Admin',
      toUser: 'John Doe',
      movementDate: '2023-01-20',
      reason: 'Initial assignment',
      approvedBy: 'Manager'
    },
    {
      id: '2',
      assetId: '2',
      fromLocation: 'Storage Room',
      toLocation: 'Office Floor 1',
      fromUser: 'Admin',
      toUser: 'Jane Smith',
      movementDate: '2023-02-15',
      reason: 'New employee setup',
      approvedBy: 'Manager'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    assetId: '',
    fromLocation: '',
    toLocation: '',
    fromUser: '',
    toUser: '',
    movementDate: '',
    reason: '',
    approvedBy: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovement: AssetMovementType = {
      ...formData,
      id: Date.now().toString()
    };
    setMovements(prev => [...prev, newMovement]);
    setFormData({
      assetId: '',
      fromLocation: '',
      toLocation: '',
      fromUser: '',
      toUser: '',
      movementDate: '',
      reason: '',
      approvedBy: ''
    });
    setShowForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
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
              <CardTitle>Asset Movement</CardTitle>
              <CardDescription>Track asset transfers and relocations</CardDescription>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Record Movement
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>Record Asset Movement</CardTitle>
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
                      <Label htmlFor="movementDate">Movement Date</Label>
                      <Input
                        id="movementDate"
                        type="date"
                        value={formData.movementDate}
                        onChange={(e) => handleInputChange('movementDate', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fromLocation">From Location</Label>
                      <Input
                        id="fromLocation"
                        value={formData.fromLocation}
                        onChange={(e) => handleInputChange('fromLocation', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="toLocation">To Location</Label>
                      <Input
                        id="toLocation"
                        value={formData.toLocation}
                        onChange={(e) => handleInputChange('toLocation', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fromUser">From User</Label>
                      <Input
                        id="fromUser"
                        value={formData.fromUser}
                        onChange={(e) => handleInputChange('fromUser', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="toUser">To User</Label>
                      <Input
                        id="toUser"
                        value={formData.toUser}
                        onChange={(e) => handleInputChange('toUser', e.target.value)}
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
                    <Button type="submit">Record Movement</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>From Location</TableHead>
                <TableHead>To Location</TableHead>
                <TableHead>From User</TableHead>
                <TableHead>To User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Approved By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell className="font-medium">{movement.assetId}</TableCell>
                  <TableCell>{movement.fromLocation}</TableCell>
                  <TableCell>{movement.toLocation}</TableCell>
                  <TableCell>{movement.fromUser}</TableCell>
                  <TableCell>{movement.toUser}</TableCell>
                  <TableCell>{new Date(movement.movementDate).toLocaleDateString()}</TableCell>
                  <TableCell>{movement.reason}</TableCell>
                  <TableCell>{movement.approvedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetMovement;
