import {Pigsty} from './pigsty';

export interface Pig {
  id?: number;
  code?: string;
  dateIn?: string;
  dateOut?: string;
  status?: number;
  weight?: number;
  isDeleted?: number;
  pigsty?: Pigsty;
}
