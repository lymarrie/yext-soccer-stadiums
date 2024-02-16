import { Address } from "./Address";

export interface DirectoryChild {
  name: string;
  meta: any;
  address: Address;
  mainPhone: string;
  slug: string;
  c_addressRegionDisplayName?: string;
  dm_childEntityIds?: string[];
}
