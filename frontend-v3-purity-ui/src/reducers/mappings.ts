import { AnyMapping, NormalizedState } from "../types";
import { UpdateMappingActionTypes } from "../types/actions/Mappings";
import {
  UPDATE_MAPPING_REQUEST,
  UPDATE_MAPPING_SUCCESS,
  UPDATE_MAPPING_FAILURE,
} from "../types/actions/Types";

const mappingsInitialState = [
  {
    id: '1', endpointId: "http:POST:payment:/paymentAuth", fields: [
      { id: 'Creditcard Number', path: { phase: 'REQUEST', value: '$.card.longNum', type: 'json', namespace: 'body'} },
      { id: 'Creditcard Expiry', path: { phase: 'REQUEST', value: '$.card.expires',  type: 'json', namespace: 'body'} },
      { id: 'User Last Name', path: { phase: 'REQUEST', value: '$.customer.lastName', type: 'json', namespace: 'body'} },
      { id: 'User Address House Number', path: { phase: 'REQUEST', value: '$.address.number', type: 'json', namespace: 'body'} },
      { id: 'User Address Country', path: { phase: 'REQUEST', value: '$.address.country', type: 'json', namespace: 'body'} },
      { id: 'User Username', path: { phase: 'REQUEST', value: '$.customer.username', type: 'json', namespace: 'body'} },
      { id: 'Creditcard CCV', path: { phase: 'REQUEST', value: '$.card.ccv', type: 'json', namespace: 'body'} },
      { id: 'User Address City', path: { phase: 'REQUEST', value: '$.address.city', type: 'json', namespace: 'body'} },
      { id: 'User Address Street', path: { phase: 'REQUEST', value: '$.address.street', type: 'json', namespace: 'body'} },
      { id: 'User First Name', path: { phase: 'REQUEST', value: '$.customer.firstName', type: 'json', namespace: 'body'} },
      { id: 'User Address Post Code', path: { phase: 'REQUEST', value: '$.address.postcode', type: 'json', namespace: 'body'} },
    ]
  },
  { id: '2', endpointId: "http:POST:orders:/orders", fields: [
      { id: 'Creditcard Number', path: { phase: 'RESPONSE', value: '$.card.longNum', type: 'json', namespace: 'body'} },
      { id: 'Creditcard Expiry', path: { phase: 'RESPONSE', value: '$.card.expires',  type: 'json', namespace: 'body'} },
      { id: 'User Last Name', path: { phase: 'RESPONSE', value: '$.customer.lastName', type: 'json', namespace: 'body'} },
      { id: 'User Address House Number', path: { phase: 'RESPONSE', value: '$.address.number', type: 'json', namespace: 'body'} },
      { id: 'User Address Country', path: { phase: 'RESPONSE', value: '$.address.country', type: 'json', namespace: 'body'} },
      { id: 'User Username', path: { phase: 'RESPONSE', value: '$.customer.username', type: 'json', namespace: 'body'} },
      { id: 'Creditcard CCV', path: { phase: 'RESPONSE', value: '$.card.ccv', type: 'json', namespace: 'body'} },
      { id: 'User Address City', path: { phase: 'RESPONSE', value: '$.address.city', type: 'json', namespace: 'body'} },
      { id: 'User Address Street', path: { phase: 'RESPONSE', value: '$.address.street', type: 'json', namespace: 'body'} },
      { id: 'User First Name', path: { phase: 'RESPONSE', value: '$.customer.firstName', type: 'json', namespace: 'body'} },
      { id: 'User Address Post Code', path: { phase: 'RESPONSE', value: '$.address.postcode', type: 'json', namespace: 'body'} },
    ]
  },
  {
    id: '3', endpointId: "http:POST:front-end.sock-shop.svc.cluster.local:/orders", fields: [
      { id: 'Creditcard Number', path: { phase: 'RESPONSE', value: '$.card.longNum', type: 'json', namespace: 'body'} },
      { id: 'Creditcard Expiry', path: { phase: 'RESPONSE', value: '$.card.expires',  type: 'json', namespace: 'body'} },
      { id: 'User Last Name', path: { phase: 'RESPONSE', value: '$.customer.lastName', type: 'json', namespace: 'body'} },
      { id: 'User Address House Number', path: { phase: 'RESPONSE', value: '$.address.number', type: 'json', namespace: 'body'} },
      { id: 'User Address Country', path: { phase: 'RESPONSE', value: '$.address.country', type: 'json', namespace: 'body'} },
      { id: 'User Username', path: { phase: 'RESPONSE', value: '$.customer.username', type: 'json', namespace: 'body'} },
      { id: 'Creditcard CCV', path: { phase: 'RESPONSE', value: '$.card.ccv', type: 'json', namespace: 'body'} },
      { id: 'User Address City', path: { phase: 'RESPONSE', value: '$.address.city', type: 'json', namespace: 'body'} },
      { id: 'User Address Street', path: { phase: 'RESPONSE', value: '$.address.street', type: 'json', namespace: 'body'} },
      { id: 'User First Name', path: { phase: 'RESPONSE', value: '$.customer.firstName', type: 'json', namespace: 'body'} },
      { id: 'User Address Post Code', path: { phase: 'RESPONSE', value: '$.address.postcode', type: 'json', namespace: 'body'} },
    ]
  },
  {id: '4', endpointId: "http:POST:shipping:/shipping"}
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
