import {Pigsty} from '../../model/pigsty';
import {Storage} from '../../model/storage';

export interface Food {
  id?: number;
  amount?: number;
  unit?: number;
  storage?: Storage;
  pigsty?: Pigsty;
  isDeleted?: boolean;

}
