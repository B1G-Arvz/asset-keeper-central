
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { Employee, Department, ConditionOption } from '@/types/employee';

interface DropdownManagementProps {
  employees: Employee[];
  departments: Department[];
  conditions: ConditionOption[];
  onEmployeeUpdate: (employees: Employee[]) => void;
  onDepartmentUpdate: (departments: Department[]) => void;
  onConditionUpdate: (conditions: ConditionOption[]) => void;
  onBack: () => void;
}

const DropdownManagement = ({
  employees,
  departments,
  conditions,
  onEmployeeUpdate,
  onDepartmentUpdate,
  onConditionUpdate,
  onBack
}: DropdownManagementProps) => {
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [editingCondition, setEditingCondition] = useState<ConditionOption | null>(null);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', department: '', position: '' });
  const [newDepartment, setNewDepartment] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email) {
      const employee: Employee = {
        id: Date.now().toString(),
        ...newEmployee,
        active: true
      };
      onEmployeeUpdate([...employees, employee]);
      setNewEmployee({ name: '', email: '', department: '', position: '' });
    }
  };

  const handleUpdateEmployee = () => {
    if (editingEmployee) {
      onEmployeeUpdate(employees.map(emp => emp.id === editingEmployee.id ? editingEmployee : emp));
      setEditingEmployee(null);
    }
  };

  const handleDeleteEmployee = (id: string) => {
    onEmployeeUpdate(employees.filter(emp => emp.id !== id));
  };

  const handleAddDepartment = () => {
    if (newDepartment) {
      const department: Department = {
        id: Date.now().toString(),
        name: newDepartment,
        active: true
      };
      onDepartmentUpdate([...departments, department]);
      setNewDepartment('');
    }
  };

  const handleUpdateDepartment = () => {
    if (editingDepartment) {
      onDepartmentUpdate(departments.map(dept => dept.id === editingDepartment.id ? editingDepartment : dept));
      setEditingDepartment(null);
    }
  };

  const handleDeleteDepartment = (id: string) => {
    onDepartmentUpdate(departments.filter(dept => dept.id !== id));
  };

  const handleAddCondition = () => {
    if (newCondition) {
      const condition: ConditionOption = {
        id: Date.now().toString(),
        name: newCondition,
        active: true
      };
      onConditionUpdate([...conditions, condition]);
      setNewCondition('');
    }
  };

  const handleUpdateCondition = () => {
    if (editingCondition) {
      onConditionUpdate(conditions.map(cond => cond.id === editingCondition.id ? editingCondition : cond));
      setEditingCondition(null);
    }
  };

  const handleDeleteCondition = (id: string) => {
    onConditionUpdate(conditions.filter(cond => cond.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <CardTitle>Dropdown Management</CardTitle>
              <CardDescription>Manage employees, departments, and condition options</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="employees" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="conditions">Conditions</TabsTrigger>
            </TabsList>

            <TabsContent value="employees">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Employee</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="empName">Name</Label>
                        <Input
                          id="empName"
                          value={newEmployee.name}
                          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                          placeholder="Employee name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="empEmail">Email</Label>
                        <Input
                          id="empEmail"
                          value={newEmployee.email}
                          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                          placeholder="Employee email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="empDept">Department</Label>
                        <Input
                          id="empDept"
                          value={newEmployee.department}
                          onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                          placeholder="Department"
                        />
                      </div>
                      <div>
                        <Label htmlFor="empPos">Position</Label>
                        <Input
                          id="empPos"
                          value={newEmployee.position}
                          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                          placeholder="Position"
                        />
                      </div>
                    </div>
                    <Button className="mt-4" onClick={handleAddEmployee}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Employee
                    </Button>
                  </CardContent>
                </Card>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          {editingEmployee?.id === employee.id ? (
                            <Input
                              value={editingEmployee.name}
                              onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                            />
                          ) : (
                            employee.name
                          )}
                        </TableCell>
                        <TableCell>
                          {editingEmployee?.id === employee.id ? (
                            <Input
                              value={editingEmployee.email}
                              onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                            />
                          ) : (
                            employee.email
                          )}
                        </TableCell>
                        <TableCell>
                          {editingEmployee?.id === employee.id ? (
                            <Input
                              value={editingEmployee.department}
                              onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
                            />
                          ) : (
                            employee.department
                          )}
                        </TableCell>
                        <TableCell>
                          {editingEmployee?.id === employee.id ? (
                            <Input
                              value={editingEmployee.position}
                              onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
                            />
                          ) : (
                            employee.position
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {editingEmployee?.id === employee.id ? (
                              <Button size="sm" onClick={handleUpdateEmployee}>
                                Save
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingEmployee(employee)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteEmployee(employee.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="departments">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Department</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Input
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                        placeholder="Department name"
                      />
                      <Button onClick={handleAddDepartment}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Department
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department Name</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departments.map((department) => (
                      <TableRow key={department.id}>
                        <TableCell>
                          {editingDepartment?.id === department.id ? (
                            <Input
                              value={editingDepartment.name}
                              onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
                            />
                          ) : (
                            department.name
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {editingDepartment?.id === department.id ? (
                              <Button size="sm" onClick={handleUpdateDepartment}>
                                Save
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingDepartment(department)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteDepartment(department.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="conditions">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Condition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Input
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        placeholder="Condition name"
                      />
                      <Button onClick={handleAddCondition}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Condition
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Condition Name</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {conditions.map((condition) => (
                      <TableRow key={condition.id}>
                        <TableCell>
                          {editingCondition?.id === condition.id ? (
                            <Input
                              value={editingCondition.name}
                              onChange={(e) => setEditingCondition({ ...editingCondition, name: e.target.value })}
                            />
                          ) : (
                            condition.name
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {editingCondition?.id === condition.id ? (
                              <Button size="sm" onClick={handleUpdateCondition}>
                                Save
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingCondition(condition)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCondition(condition.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DropdownManagement;
