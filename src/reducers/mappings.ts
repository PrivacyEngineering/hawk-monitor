import {GroupedUsageField, Mapping, NormalizedState} from "../types";
import {
    CreateMappingActionTypes,
    CreateMappingSuccessAction,
    DeleteMappingActionTypes,
    DeleteMappingSuccessAction,
    FetchMappingFieldSuggestionsActionTypes,
    FetchMappingsActionTypes,
    FetchUnmappedEndpointsActionTypes,
    UpdateMappingActionTypes,
    UpdateMappingSuccessAction
} from "../types/actions/Mappings";
import {
    CREATE_MAPPING_FAILURE,
    CREATE_MAPPING_REQUEST,
    CREATE_MAPPING_SUCCESS,
    DELETE_MAPPING_FAILURE,
    DELETE_MAPPING_REQUEST,
    DELETE_MAPPING_SUCCESS, FETCH_MAPPING_FIELD_SUGGESTIONS_REQUEST,
    FETCH_MAPPING_FIELD_SUGGESTIONS_SUCCESS,
    FETCH_MAPPINGS_SUCCESS,
    FETCH_UNMAPPED_ENDPOINTS_SUCCESS,
    UPDATE_MAPPING_FAILURE,
    UPDATE_MAPPING_REQUEST,
    UPDATE_MAPPING_SUCCESS,
} from "../types/actions/Types";

export const mappings = (state: Mapping[] = [], action: FetchMappingsActionTypes | CreateMappingSuccessAction | DeleteMappingSuccessAction | UpdateMappingSuccessAction) => {
    switch (action.type) {
        case FETCH_MAPPINGS_SUCCESS:
            return action.mappings;
        case UPDATE_MAPPING_SUCCESS:
            return [...state.filter(m => m.id !== action.mapping.id), action.mapping];
        case DELETE_MAPPING_SUCCESS:
            return [...state.filter(m => m.id !== action.mapping.id)];
        default:
            return state;
    }
};

export const unmappedEndpoints = (state: String[] = [], action: FetchUnmappedEndpointsActionTypes | CreateMappingActionTypes | DeleteMappingActionTypes) => {
    switch (action.type) {
        case FETCH_UNMAPPED_ENDPOINTS_SUCCESS:
            return action.endpoints;
        case CREATE_MAPPING_SUCCESS:
            return [...state.filter(m => m !== action.mapping.endpointId)];
        case DELETE_MAPPING_SUCCESS:
            return [...state, action.mapping.endpointId];
        default:
            return state;
    }
};

export const mappingFieldSuggestions = (state: Map<string, GroupedUsageField[]> = new Map<string, GroupedUsageField[]>(), action: FetchMappingFieldSuggestionsActionTypes) => {
    switch (action.type) {
        case FETCH_MAPPING_FIELD_SUGGESTIONS_SUCCESS: {
            let newState = new Map(state);
            newState.set(action.endpoint, action.suggestions);
            return newState;
        }
        default:
            return state;
    }
};

export const requestedFieldSuggestions = (state: Map<string, boolean> = new Map<string, boolean>(), action: FetchMappingFieldSuggestionsActionTypes) => {
    switch (action.type) {
        case FETCH_MAPPING_FIELD_SUGGESTIONS_REQUEST:
            let newState = new Map(state);
            newState.set(action.endpoint, true);
            return newState;
        default:
            return state;
    }
};

export const mappingsBeingCreated = (state: NormalizedState<boolean | undefined> = {}, action: CreateMappingActionTypes) => {
    switch (action.type) {
        case CREATE_MAPPING_REQUEST: {
            const nextState = {...state};
            nextState[action.mapping.endpointId] = true;
            return nextState;
        }
        case CREATE_MAPPING_SUCCESS:
        case CREATE_MAPPING_FAILURE: {
            const nextState = {...state};
            nextState[action.mapping.endpointId] = undefined;
            return nextState;
        }
        default:
            return state;
    }
}

export const mappingsBeingUpdated = (state: NormalizedState<boolean | undefined> = {}, action: UpdateMappingActionTypes) => {
    switch (action.type) {
        case UPDATE_MAPPING_REQUEST: {
            const nextState = {...state};
            nextState[action.mapping.id] = true;
            return nextState;
        }
        case UPDATE_MAPPING_SUCCESS:
        case UPDATE_MAPPING_FAILURE: {
            const nextState = {...state};
            nextState[action.mapping.id] = undefined;
            return nextState;
        }
        default:
            return state;
    }
}

export const mappingsBeingDeleted = (state: Array<boolean> = new Array<boolean>(), action: DeleteMappingActionTypes) => {
    switch (action.type) {
        case DELETE_MAPPING_REQUEST: {
            const nextState = [...state];
            nextState[action.mapping.id] = true;
            return nextState;
        }
        case DELETE_MAPPING_SUCCESS:
        case DELETE_MAPPING_FAILURE: {
            const nextState = [...state];
            nextState[action.mapping.id] = false;
            return nextState;
        }
        default:
            return state;
    }
}
