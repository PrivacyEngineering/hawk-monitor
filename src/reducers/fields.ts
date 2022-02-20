import { Field, NormalizedState } from "../types";
import {
  CreateFieldActionTypes,
  CreateFieldSuccessAction,
  DeleteFieldActionTypes,
  DeleteFieldSuccessAction,
  UpdateFieldActionTypes,
  UpdateFieldSuccessAction,
} from "../types/actions/Fields";
import {
  CREATE_FIELD_FAILURE,
  CREATE_FIELD_REQUEST,
  CREATE_FIELD_SUCCESS,
  UPDATE_FIELD_REQUEST,
  UPDATE_FIELD_SUCCESS,
  UPDATE_FIELD_FAILURE,
  DELETE_FIELD_REQUEST,
  DELETE_FIELD_SUCCESS,
  DELETE_FIELD_FAILURE,
} from "../types/actions/Types";

const fieldsInitialState = [
  { id: 'User First Name', description: 'First name of the customer', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: '' },
  { id: 'User Last Name', description: 'Last name of the customer', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: '' },
  { id: 'User Username', description: 'Username of the customer', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: '' },
  { id: 'User Address Post Code', description: 'Postal code of the address of the customer', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: 'Unable to notify users about the test results' },
  { id: 'User Address Street', description: 'Street of the address of the customer', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: '' },
  { id: 'User Address House Number', description: 'House Number in the street of the customer', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: '' },
  { id: 'User Address City', description: 'City of the customer', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: '' },
  { id: 'User Address Country', description: 'Country of the customer', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: '' },
  { id: 'Creditcard Number', description: 'Credit card number of the customer', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: '' },
  { id: 'Creditcard Expiry', description: 'Credit card expiry month and year of the customer', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: '' },
  { id: 'Creditcard CCV', description: 'CCV (security code) of the credit card of the customer', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: '' },
];

export const fields = (state: Field[] = fieldsInitialState, action: CreateFieldSuccessAction | UpdateFieldSuccessAction | DeleteFieldSuccessAction) => {
  switch (action.type) {
    case CREATE_FIELD_SUCCESS:
      return [...state, action.field];
    case UPDATE_FIELD_SUCCESS:
      return [...state.filter(f => f.id !== action.field.id), action.field];
    case DELETE_FIELD_SUCCESS:
      return [...state.filter(f => f.id !== action.field.id)]
    default:
      return state;
  }
};

export const fieldsBeingCreated = (state: NormalizedState<boolean | undefined> = {}, action: CreateFieldActionTypes) => {
  switch (action.type) {
    case CREATE_FIELD_REQUEST: {
      const nextState = { ...state };
      nextState[action.field.id] = true;
      return nextState;
    }
    case CREATE_FIELD_SUCCESS:
    case CREATE_FIELD_FAILURE: {
      const nextState = { ...state };
      nextState[action.field.id] = undefined;
      return nextState;
    }
    default:
      return state;
  }
}

export const fieldsBeingUpdated = (state: NormalizedState<boolean | undefined> = {}, action: UpdateFieldActionTypes) => {
  switch (action.type) {
    case UPDATE_FIELD_REQUEST: {
      const nextState = { ...state };
      nextState[action.field.id] = true;
      return nextState;
    }
    case UPDATE_FIELD_SUCCESS:
    case UPDATE_FIELD_FAILURE: {
      const nextState = { ...state };
      nextState[action.field.id] = undefined;
      return nextState;
    }
    default:
      return state;
  }
}

export const fieldsBeingDeleted = (state: NormalizedState<boolean | undefined> = {}, action: DeleteFieldActionTypes) => {
  switch (action.type) {
    case DELETE_FIELD_REQUEST: {
      const nextState = { ...state };
      nextState[action.field.id] = true;
      return nextState;
    }
    case DELETE_FIELD_SUCCESS:
    case DELETE_FIELD_FAILURE: {
      const nextState = { ...state };
      nextState[action.field.id] = undefined;
      return nextState;
    }
    default:
      return state;
  }
}
