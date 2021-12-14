export interface Field {
  id: string;
  description: string;
  personalData: boolean;
  specialCategoryPersonalData: boolean;
}

export interface TableProps<T> {
  labels: string[];
  items: readonly T[];
}

export interface TableRowProps<T> {
  item: T;
}

export interface ExistingMapping {
  service: string;
  endpoint: string;
  httpStatusCode: number;
  attachedFields: string[];
  mapping: any;
}

export interface UnmappedEndpoint {
  service: string;
  endpoint: string;
  httpStatusCode: number;
}

export interface DataCategory {
  id: string;
  name: string;
  value: number;
}
