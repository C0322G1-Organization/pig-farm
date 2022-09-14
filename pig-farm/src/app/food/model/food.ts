import {Pigsty} from "./pigsty";
import {Storages} from "./storages";

export interface Food {
  id?: number;
  amount?: number;
  unit?: string;
  storage?: Storages;
  pigsty?: Pigsty;
  isDeleted?: boolean;

}
