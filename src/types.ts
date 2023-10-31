export type SidebarVariant = 'opaque' | 'transparent';

export interface Field {
  name: string;
  consequences: string;
  contractualRegulation: boolean;
  description: string;
  legalBases: LegalBase[];
  legalRequirement: boolean;
  obligationToProvide: boolean;
  personalData: boolean;
  specialCategoryPersonalData: boolean;
}

export interface TableProps<T> {
  labels: string[];
  items: readonly T[];
}

export interface TableRowPropsWithIndex<T> {
  index: number,
  item: T;
}

export interface TableRowProps<T> {
  item: T;
}

export interface TableRowProps<T> {
  item: T;
}

export interface Purpose {
  purpose: string;
  description: string;
}

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

export interface GroupedUsageField {
  phase: string;
  namespace: string;
  format: string;
  path: string;
}

export interface MappingFieldReference {
  id?: number;
  field: string;
  phase: string;
  namespace: string;
  format: string;
  path: string;
}

export interface Request {
  requestor: string;
  provider: string;
  date: string;
  data: any;
}

export interface RequestsByServicePair {
  requestor: string;
  provider: string;
  count: number;
  lastInvocation: string;
}

export interface RequestsByEndpoint {
  provider: string;
  endpoint: string;
  count: number;
  lastInvocation: string;
}

export interface DataCategory {
  id: string;
  name: string;
  value: number;
}

export interface NormalizedState<T> {
  [id: string]: T;
}

export interface LegalBase {
  reference: string;
  description: string;
}

export type LegalBaseExtended = LegalBase & {
  regulation: string;
  article: string;
  paragraph: string;
}
