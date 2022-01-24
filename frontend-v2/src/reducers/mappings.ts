import { Mapping, MappingBase } from "../types";

const mappingsInitialState = [
  { id: '1', service: 'orders', endpoint: { protocol: 'HTTP', method: 'POST', path: '/create', }, fields: ['user', 'city'] },
  { id: '2', service: 'statistics', endpoint: { protocol: 'HTTP', method: 'POST', path: '/revenue', }, fields: [] },
  { id: '3', service: 'user', endpoint: { protocol: 'HTTP', method: 'POST', path: '/newsletter', }, fields: ['user'] },
  { id: '4', service: 'user', endpoint: { protocol: 'HTTP', method: 'POST', path: '/signup', }, fields: ['user', 'city'] },
];

export const mappings = (state: Mapping[] = mappingsInitialState, action: any) => {
  switch (action) {
    // case actions.FETCH_MAPPINGS_SUCCESS:
    //   return action.mappings.map(mapping => ...);
    default:
      return state;
  }
};

const unhandeldMappingsInitialState: MappingBase[] = [
  { id: '5', service: 'payment', endpoint: { protocol: 'HTTP', method: 'GET', path: '/pay/once' } },
  { id: '6', service: 'payment', endpoint: { protocol: 'HTTP', method: 'GET', path: '/pay/recurring' } },
  { id: '7', service: 'statistics', endpoint: { protocol: 'HTTP', method: 'GET', path: '/successful-payment' } },
];

export const unhandeldMappings = (state: MappingBase[] = unhandeldMappingsInitialState, action: any) => {
  switch (action) {
    // case actions.FETCH_MAPPINGS_SUCCESS:
    //   return action.mappings.map(mapping => ...);
    default:
      return state;
  }
};