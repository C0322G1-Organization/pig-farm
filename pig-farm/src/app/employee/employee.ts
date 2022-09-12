import {Export} from '../export_port/export';
import {User} from '../user/user';

export interface Employee {
  id?: number;
  code?: string;
  name?: string;
  birthday?: string;
  gender?: string;
  idCard?: string;
  image?: string;
  isDeleted?: boolean;
  export?: Export;
  user?: User;
}
