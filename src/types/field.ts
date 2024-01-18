import { InfoTypeType } from "./dlp";
import { LegalBase } from "./types";

export interface Field {
  name: string;
  infoTypes: InfoTypeType[];
  consequences: string;
  contractualRegulation: boolean;
  description: string;
  legalBases: LegalBase[];
  legalRequirement: boolean;
  obligationToProvide: boolean;
  personalData: boolean;
  specialCategoryPersonalData: boolean;
}


export interface MappingFieldReference {
  id?: number;
  field: string;
  phase: string;
  namespace: string;
  format: string;
  path: string;
}

export interface GroupedUsageField {
  phase: string;
  namespace: string;
  format: string;
  path: string;
}