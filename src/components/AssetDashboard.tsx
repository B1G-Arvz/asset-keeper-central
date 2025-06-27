
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Package, ArrowLeftRight, Trash2, Settings } from 'lucide-react';
import AssetIdentification from './AssetIdentification';
import AssetMovement from './AssetMovement';
import AssetDisposal from './AssetDisposal';
import DropdownManagement from './DropdownManagement';
import { Employee, Department, ConditionOption } from '@/types/employee';

interface AssetDashboardProps {
  onLogout: () => void;
}

const AssetDashboard = ({ onLogout }: AssetDashboardProps) => {
  const [showDropdownManagement, setShowDropdownManagement] = useState(false);
  
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'John Doe', email: 'john.doe@company.com', department: 'IT Department', position: 'Developer', active: true },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@company.com', department: 'HR Department', position: 'HR Manager', active: true },
    { id: '3', name: 'Mike Johnson', email: 'mike.johnson@company.com', department: 'Marketing Department', position: 'Marketing Specialist', active: true },
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: 'Marketing Department', active: true },
    { id: '2', name: 'Sales Department', active: true },
    { id: '3', name: 'Operations Department', active: true },
    { id: '4', name: 'Business Department', active: true },
    { id: '5', name: "CEO's Office", active: true },
    { id: '6', name: 'Board Room', active: true },
    { id: '7', name: 'IT Department', active: true },
    { id: '8', name: 'HR Department', active: true },
  ]);

  const [conditions, setConditions] = useState<ConditionOption[]>([
    { id: '1', name: 'Good', active: true },
    { id: '2', name: 'Needs Repair', active: true },
    { id: '3', name: 'Excellent', active: true },
    { id: '4', name: 'Fair', active: true },
  ]);

  if (showDropdownManagement) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Asset Management System</h1>
                <p className="text-gray-600">Dropdown Management</p>
              </div>
              <Button onClick={onLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DropdownManagement
            employees={employees}
            departments={departments}
            conditions={conditions}
            onEmployeeUpdate={setEmployees}
            onDepartmentUpdate={setDepartments}
            onConditionUpdate={setConditions}
            onBack={() => setShowDropdownManagement(false)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Asset Management System</h1>
              <p className="text-gray-600">Manage your organization's assets</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowDropdownManagement(true)} variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Manage Dropdowns
              </Button>
              <Button onClick={onLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="identification" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="identification" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Asset Identification & Allocation
            </TabsTrigger>
            <TabsTrigger value="movement" className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4" />
              Asset Movement
            </TabsTrigger>
            <TabsTrigger value="disposal" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Asset Disposal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="identification">
            <AssetIdentification
              employees={employees}
              departments={departments}
              conditions={conditions}
            />
          </TabsContent>
          
          <TabsContent value="movement">
            <AssetMovement />
          </TabsContent>
          
          <TabsContent value="disposal">
            <AssetDisposal />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AssetDashboard;
