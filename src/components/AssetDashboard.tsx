
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Package, ArrowLeftRight, Trash2 } from 'lucide-react';
import AssetIdentification from './AssetIdentification';
import AssetMovement from './AssetMovement';
import AssetDisposal from './AssetDisposal';

interface AssetDashboardProps {
  onLogout: () => void;
}

const AssetDashboard = ({ onLogout }: AssetDashboardProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Asset Management System</h1>
              <p className="text-gray-600">Manage your organization's assets</p>
            </div>
            <Button onClick={onLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
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
            <AssetIdentification />
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
