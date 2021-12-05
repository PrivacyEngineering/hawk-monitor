export interface Log {
  requestService: Service;
  responseService: Service;
  date: string;
  data: any;
  purpose: Purpose;
}

export type Service = 'frontend' | 'newsletter' | 'payment' | 'user';

export interface Purpose {
  type: string;
  formatted: string;
  id?: number;
}