import { MappingFieldReference } from "./field";
import { Purpose } from "./types";

export interface MappingStorage {
  description: string;
  ttl: string;
}

export interface AnyMapping {
  id?: number;
  endpointId: string;
  fields?: MappingFieldReference[];
  purposes?: Purpose[];
  legitimateInterests: string[];
  recipients: string[];
  storage: MappingStorage[];
}

export interface Mapping extends AnyMapping {
  id: number;
  fields: MappingFieldReference[]
}

