import {Export} from './export';
import {UserDto} from '../user/user';

export interface Employee {
  id?: number;
  code?: string;
  name?: string;
  birthDay?: string;
  gender?: string;
  idCard?: string;
  image?: string;
  isDeleted?: boolean;
  export?: Export;
  userDto?: UserDto;
}
