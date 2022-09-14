import {Pigsty} from '../../model/pigsty';

export interface Food {
  id?: number;
  amount?: number;
  unit?: string;
  storage?: Storage;
  pigsty?: Pigsty;
  isDeleted?: boolean;

}
