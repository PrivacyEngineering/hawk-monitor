
export * from './mapping';
export * from './field';

export type SidebarVariant = 'opaque' | 'transparent';


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
