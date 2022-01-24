import { AnyMapping } from "../types";

const mappingsInitialState = [
  {
    id: '1', service: 'orders', endpoint: { protocol: 'HTTP', method: 'POST', path: '/create', }, fields: [
      { id: 'email', path: { type: "json", value: "$.body[*].user.email" } },
      { id: 'city', path: { type: "json", value: "$.body[*].user.city" } },
    ]
  },
  { id: '2', service: 'statistics', endpoint: { protocol: 'HTTP', method: 'POST', path: '/revenue', }, fields: [] },
  {
    id: '3', service: 'user', endpoint: { protocol: 'HTTP', method: 'POST', path: '/newsletter', }, fields: [
      { id: 'user', path: { type: "json", value: "$.body[*].user" } },
    ]
  },
  {
    id: '4', service: 'user', endpoint: { protocol: 'HTTP', method: 'POST', path: '/signup', }, fields: [
      { id: 'email', path: { type: "json", value: "$.body[*].user.email" } },
      { id: 'city', path: { type: "json", value: "$.body[*].user.city" } },
    ]
  },
  { id: '5', service: 'payment', endpoint: { protocol: 'HTTP', method: 'GET', path: '/pay/once' } },
  { id: '6', service: 'payment', endpoint: { protocol: 'HTTP', method: 'GET', path: '/pay/recurring' } },
  { id: '7', service: 'statistics', endpoint: { protocol: 'HTTP', method: 'GET', path: '/successful-payment' } },
];

export const mappings = (state: AnyMapping[] = mappingsInitialState, action: any) => {
  switch (action) {
    // case actions.FETCH_MAPPINGS_SUCCESS:
    //   return action.mappings.map(mapping => ...);
    default:
      return state;
  }
};
