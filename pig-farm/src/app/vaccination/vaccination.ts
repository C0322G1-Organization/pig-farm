import {Pigsty} from '../pigsty/pigsty';

export interface Vaccination {
  id ?: number;
  date ?: string;
  amount ?: number;
  vaccineType ?: string;
  vaccinatedPerson ?: string;
  note ?: string;
  isDeleted ?: boolean;
  pigsty ?: Pigsty;
}
