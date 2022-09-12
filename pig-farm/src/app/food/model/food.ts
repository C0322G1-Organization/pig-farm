import {Pigsty} from "./pigsty";
import {Storage} from "./storage";

export interface Food {
  id?: number;
  amount?: number;
  unit?: string;
  storage?: Storage;
  pigsty?: Pigsty;
  isDeleted?: boolean;

}
