import { AnyMapping, NormalizedState } from "../types";
import { UpdateMappingActionTypes } from "../types/actions/Mappings";
import {
  UPDATE_MAPPING_REQUEST,
  UPDATE_MAPPING_SUCCESS,
  UPDATE_MAPPING_FAILURE,
} from "../types/actions/Types";

const mappingsInitialState = [
  {
    id: '1', service: 'orders', endpoint: { protocol: 'HTTP', method: 'POST', path: '/create', }, fields: [
      { id: 'email', path: { type: "json", value: "$.body[*].user.email" } },
      { id: 'genetic', path: { type: "json", value: "$.body[*].user.city" } },
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
  switch (action.type) {
    case UPDATE_MAPPING_SUCCESS:
      return [...state.filter(m => m.id !== action.mapping.id), action.mapping];
    default:
      return state;
  }
};

export const mappingsBeingUpdated = (state: NormalizedState<boolean | undefined> = {}, action: UpdateMappingActionTypes) => {
  switch (action.type) {
    case UPDATE_MAPPING_REQUEST: {
      const nextState = { ...state };
      nextState[action.mapping.id] = true;
      return nextState;
    }
    case UPDATE_MAPPING_SUCCESS:
    case UPDATE_MAPPING_FAILURE: {
      const nextState = { ...state };
      nextState[action.mapping.id] = undefined;
      return nextState;
    }
    default:
      return state;
  }
}
