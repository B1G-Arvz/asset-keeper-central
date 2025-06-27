
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Asset } from '@/types/asset';
import { Employee, Department, ConditionOption } from '@/types/employee';
import { ArrowLeft } from 'lucide-react';

interface AssetFormProps {
  asset?: Asset | null;
  employees: Employee[];
  departments: Department[];
  conditions: ConditionOption[];
  onSave: (asset: Asset) => void;
  onCancel: () => void;
}

const AssetForm = ({ asset, employees, departments, conditions, onSave, onCancel }: AssetFormProps) => {
  const [formData, setFormData] = useState<Omit<Asset, 'id'>>({
    assetName: asset?.assetName || '',
    assetType: asset?.assetType || 'IT Equipment',
    newCode: asset?.newCode || '',
    deviceId: asset?.deviceId || '',
    purchaseDate: asset?.purchaseDate || '',
    currentCondition: asset?.currentCondition || '',
    status: asset?.status || 'Active',
    remarks: asset?.remarks || '',
    vendorName: asset?.vendorName || '',
    costValue: asset?.costValue || 0,
    originallyIssuedTo: asset?.originallyIssuedTo || '',
    currentlyIssuedTo: asset?.currentlyIssuedTo || '',
    department: asset?.department || '',
    location: asset?.location || '',
    conditionAtAssignment: asset?.conditionAtAssignment || '',
    dateOfIssue: asset?.dateOfIssue || '',
    maintenanceHistory: asset?.maintenanceHistory || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: asset?.id || ''
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const activeEmployees = employees.filter(emp => emp.active);
  const activeDepartments = departments.filter(dept => dept.active);
  const activeConditions = conditions.filter(cond => cond.active);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onCancel}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <CardTitle>{asset ? 'Edit Asset' : 'Add New Asset'}</CardTitle>
              <CardDescription>Fill in the asset information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Asset Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Asset Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assetName">Asset Name</Label>
                  <Input
                    id="assetName"
                    value={formData.assetName}
                    onChange={(e) => handleInputChange('assetName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Asset Type</Label>
                  <RadioGroup
                    value={formData.assetType}
                    onValueChange={(value) => handleInputChange('assetType', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="IT Equipment" id="it" />
                      <Label htmlFor="it">IT Equipment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Furniture & Fixtures" id="furniture" />
                      <Label htmlFor="furniture">Furniture & Fixtures</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Office Supplies" id="supplies" />
                      <Label htmlFor="supplies">Office Supplies</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Small Tools" id="tools" />
                      <Label htmlFor="tools">Small Tools</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newCode">New Code (name-brand-number)</Label>
                  <Input
                    id="newCode"
                    value={formData.newCode}
                    onChange={(e) => handleInputChange('newCode', e.target.value)}
                    placeholder="e.g., DELL-XPS-001"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviceId">Device ID/Serial No.</Label>
                  <Input
                    id="deviceId"
                    value={formData.deviceId}
                    onChange={(e) => handleInputChange('deviceId', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Asset Condition and Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Asset Condition and Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentCondition">Current Condition</Label>
                  <Select value={formData.currentCondition} onValueChange={(value) => handleInputChange('currentCondition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeConditions.map((condition) => (
                        <SelectItem key={condition.id} value={condition.name}>
                          {condition.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <RadioGroup
                    value={formData.status}
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Active" id="active" />
                      <Label htmlFor="active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Inactive" id="inactive" />
                      <Label htmlFor="inactive">Inactive</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Input
                    id="remarks"
                    value={formData.remarks}
                    onChange={(e) => handleInputChange('remarks', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Purchase Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Purchase Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendorName">Vendor Name</Label>
                  <Input
                    id="vendorName"
                    value={formData.vendorName}
                    onChange={(e) => handleInputChange('vendorName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costValue">Cost/Value</Label>
                  <Input
                    id="costValue"
                    type="number"
                    step="0.01"
                    value={formData.costValue}
                    onChange={(e) => handleInputChange('costValue', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Asset Assignment and Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Asset Assignment and Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originallyIssuedTo">Originally Issued To</Label>
                  <Select value={formData.originallyIssuedTo} onValueChange={(value) => handleInputChange('originallyIssuedTo', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeEmployees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.name}>
                          {employee.name} - {employee.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentlyIssuedTo">Currently Issued To</Label>
                  <Select value={formData.currentlyIssuedTo} onValueChange={(value) => handleInputChange('currentlyIssuedTo', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeEmployees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.name}>
                          {employee.name} - {employee.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeDepartments.map((department) => (
                        <SelectItem key={department.id} value={department.name}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conditionAtAssignment">Condition at Assignment</Label>
                  <Select value={formData.conditionAtAssignment} onValueChange={(value) => handleInputChange('conditionAtAssignment', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeConditions.map((condition) => (
                        <SelectItem key={condition.id} value={condition.name}>
                          {condition.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfIssue">Date of Issue</Label>
                  <Input
                    id="dateOfIssue"
                    type="date"
                    value={formData.dateOfIssue}
                    onChange={(e) => handleInputChange('dateOfIssue', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {asset ? 'Update Asset' : 'Create Asset'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetForm;
