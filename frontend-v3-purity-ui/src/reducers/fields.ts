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
  { id: 'blood-test-category', description: 'Blood test category', personalData: false, specialCategoryPersonalData: false, legalBases: [{requirement: 'GDPR-6-1-a', 'description': 'Consent'}], legalRequirement: false, contractualRegulation: false, obligationToProvide: true, consequences: 'Prevents automatic result assessment' },
  { id: 'blood-test-result', description: 'Blood test results', personalData: true, specialCategoryPersonalData: true, legalBases: [{requirement: 'GDPR-6-1-c', 'description': 'Performance of a contract'}, {requirement: 'GDPR-6-1-e', 'description': 'Public interest'}], legalRequirement: false, contractualRegulation: true, obligationToProvide: true, consequences: '' },
  { id: 'city', description: 'City name with Alpha-2 country code', personalData: false, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: '' },
  { id: 'email', description: 'Email address', personalData: true, specialCategoryPersonalData: false, legalBases: [], legalRequirement: false, contractualRegulation: false, obligationToProvide: false, consequences: 'Unable to notify users about the test results' },
  { id: 'genetic', description: 'Genetic information', personalData: true, specialCategoryPersonalData: true, legalBases: [], legalRequirement: false, contractualRegulation: true, obligationToProvide: false, consequences: '' },
  { id: 'user', description: 'User legal name', personalData: true, specialCategoryPersonalData: false, legalBases: [{requirement: 'GDPR-6-1-f', 'description': 'Consent'}], legalRequirement: false, contractualRegulation: true, obligationToProvide: true, consequences: '' },
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
