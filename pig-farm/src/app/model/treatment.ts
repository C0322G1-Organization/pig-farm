import {Pig} from './pig';

export interface Treatment {
  id?: number;
  date?: string;
  doctor?: string;
  diseases?: string;
  medicine?: string;
  amount?: number;
  isDeleted?: boolean;
  pig_id?: Pig;
}
