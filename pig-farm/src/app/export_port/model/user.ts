import {UserRole} from './userRole';

export interface User {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  creationDate?: string;
  isDeleted?: boolean;
  userRole?: UserRole;
}
