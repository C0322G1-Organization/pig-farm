import {Employee} from '../employee/employee';
import {UserRole} from './user-role';

export interface UserDto {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  creationDate?: string;
  isDeleted?: boolean;
  employee?: Employee;
  userRoles?: UserRole;
}
