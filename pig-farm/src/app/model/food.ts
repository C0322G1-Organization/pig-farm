import {Pigsty} from './pigsty';
import {Storage} from './storage';

export interface Food {
  id?: number;
  amount?: number;
  unit?: number;
  storage?: Storage;
  pigsty?: Pigsty;
  isDeleted?: boolean;

}
