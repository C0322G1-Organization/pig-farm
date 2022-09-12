import {Employee} from '../employee/employee';

export interface User {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  creationDate?: string;
  isDeleted?: boolean;
  employee?: Employee;
}
