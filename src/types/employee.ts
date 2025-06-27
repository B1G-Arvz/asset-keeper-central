
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  active: boolean;
}

export interface Department {
  id: string;
  name: string;
  active: boolean;
}

export interface ConditionOption {
  id: string;
  name: string;
  active: boolean;
}
