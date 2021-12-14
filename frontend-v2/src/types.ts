export interface Field {
  id: string;
  description: string;
  personalData: boolean;
  specialCategoryPersonalData: boolean;
}

export interface TableProps<T> {
  items: readonly T[];
}

export interface TableRowProps<T> {
  item: T;
}