import {Pigsty} from '../../pigsty/pigsty';
import {Storage} from '../../storage/storage';

export interface Food {
  id ?: number;
  amount ?: number;
  unit ?: string;
  storage ?: Storage;
  pigsty ?: Pigsty;
  isDeleted ?: boolean;
}
