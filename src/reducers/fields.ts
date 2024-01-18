import { Field, NormalizedState } from "../types/types";
import {
  CreateFieldActionTypes,
  CreateFieldSuccessAction,
  DeleteFieldActionTypes,
  DeleteFieldSuccessAction,
  FetchFieldsActionTypes,
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
  FETCH_FIELDS_SUCCESS,
} from "../types/actions/Types";

export const fields = (state: Field[] = [], action: FetchFieldsActionTypes | CreateFieldSuccessAction | UpdateFieldSuccessAction | DeleteFieldSuccessAction) => {
  switch (action.type) {
    case FETCH_FIELDS_SUCCESS:
      return action.fields;
    case CREATE_FIELD_SUCCESS:
      return [...state, action.field];
    case UPDATE_FIELD_SUCCESS:
      return [...state.filter(f => f.name !== action.field.name), action.field];
    case DELETE_FIELD_SUCCESS:
      return [...state.filter(f => f.name !== action.field.name)]
    default:
      return state;
  }
};

export const fieldsBeingCreated = (state: NormalizedState<boolean | undefined> = {}, action: CreateFieldActionTypes) => {
  switch (action.type) {
    case CREATE_FIELD_REQUEST: {
      const nextState = { ...state };
      nextState[action.field.name] = true;
      return nextState;
    }
    case CREATE_FIELD_SUCCESS:
    case CREATE_FIELD_FAILURE: {
      const nextState = { ...state };
      nextState[action.field.name] = undefined;
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
      nextState[action.field.name] = true;
      return nextState;
    }
    case UPDATE_FIELD_SUCCESS:
    case UPDATE_FIELD_FAILURE: {
      const nextState = { ...state };
      nextState[action.field.name] = undefined;
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
      nextState[action.field.name] = true;
      return nextState;
    }
    case DELETE_FIELD_SUCCESS:
    case DELETE_FIELD_FAILURE: {
      const nextState = { ...state };
      nextState[action.field.name] = undefined;
      return nextState;
    }
    default:
      return state;
  }
}
