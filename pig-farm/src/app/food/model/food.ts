import {Pigsty} from '../../pigsty/pigsty';

export interface Food {
  id?: number;
  amount?: number;
  unit?: number;
  storage?: Storage;
  pigsty?: Pigsty;
  isDeleted?: boolean;
}
