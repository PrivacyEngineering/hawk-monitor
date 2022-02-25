import { AnyMapping, NormalizedState } from "../types";
import { FetchMappingsActionTypes, UpdateMappingActionTypes, UpdateMappingSuccessAction } from "../types/actions/Mappings";
import {
  UPDATE_MAPPING_REQUEST,
  UPDATE_MAPPING_SUCCESS,
  UPDATE_MAPPING_FAILURE,
  FETCH_MAPPINGS_SUCCESS,
} from "../types/actions/Types";

export const mappings = (state: AnyMapping[] = [], action: FetchMappingsActionTypes | UpdateMappingSuccessAction) => {
  switch (action.type) {
    case FETCH_MAPPINGS_SUCCESS:
      return action.mappings;
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
