import {UserRole} from './user-role';
import {Employee} from '../model/employee';

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
