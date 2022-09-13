import {Pigsty} from './pigsty';
import {Employee} from './employee';

export interface Export {
  id?: number;
  codeExport?: string;
  company?: string;
  saleDate?: string;
  amount?: number;
  kilogram?: number;
  totalMoney?: number;
  price?: number;
  typePigs?: string;
  isDeleted?: boolean;
  pigsty?: Pigsty;
  employee?: Employee;
}
