import {Pigsty} from './pigsty';

export interface Pig {
  id?: number;
  code?: string;
  dateIn?: string;
  dateOut?: string;
  status?: string;
  weight?: number;
  isDeleted?: number;
  pigsty?: Pigsty;
}
