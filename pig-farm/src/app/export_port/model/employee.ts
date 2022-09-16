import {User} from './user';
import {Export} from './export';

class UserDto {

}

export interface Employee {
 id?: number;
 code?: string;
 name?: string;
 user?: User;
}
