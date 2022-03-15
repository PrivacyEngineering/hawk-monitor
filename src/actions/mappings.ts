import {
    deleteMapping,
    getMappingFieldSuggestions,
    getMappings,
    getUnmappedEndpoints,
    postMapping,
    putMapping
} from "gateways/mappings";
import {Dispatch} from "react";
import {AnyAction} from "redux";
import {AnyMapping} from "types";
import {
    CREATE_MAPPING_FAILURE,
    CREATE_MAPPING_REQUEST,
    CREATE_MAPPING_SUCCESS,
    DELETE_MAPPING_FAILURE,
    DELETE_MAPPING_REQUEST,
    DELETE_MAPPING_SUCCESS,
    FETCH_MAPPING_FIELD_SUGGESTIONS_FAILURE,
    FETCH_MAPPING_FIELD_SUGGESTIONS_REQUEST,
    FETCH_MAPPING_FIELD_SUGGESTIONS_SUCCESS,
    FETCH_MAPPINGS_FAILURE,
    FETCH_MAPPINGS_REQUEST,
    FETCH_MAPPINGS_SUCCESS,
    FETCH_UNMAPPED_ENDPOINTS_FAILURE,
    FETCH_UNMAPPED_ENDPOINTS_REQUEST,
    FETCH_UNMAPPED_ENDPOINTS_SUCCESS,
    UPDATE_MAPPING_FAILURE,
    UPDATE_MAPPING_REQUEST,
    UPDATE_MAPPING_SUCCESS
} from "types/actions/Types";

export const fetchMappings = (dispatch: Dispatch<AnyAction>) => {
    dispatch({type: FETCH_MAPPINGS_REQUEST});
    getMappings()
        .then(mappings => dispatch({type: FETCH_MAPPINGS_SUCCESS, mappings}))
        .catch(error => dispatch({type: FETCH_MAPPINGS_FAILURE, error}))
}

export const fetchUnmappedEndpoints = (dispatch: Dispatch<AnyAction>) => {
    dispatch({type: FETCH_UNMAPPED_ENDPOINTS_REQUEST});
    getUnmappedEndpoints()
        .then(endpoints => {
            dispatch({type: FETCH_UNMAPPED_ENDPOINTS_SUCCESS, endpoints});
        })
        .catch(error => dispatch({type: FETCH_UNMAPPED_ENDPOINTS_FAILURE, error}))
}

export const createMapping = (dispatch: Dispatch<AnyAction>, mapping: AnyMapping, callback: () => void) => {
    dispatch({type: CREATE_MAPPING_REQUEST, mapping});
    postMapping(mapping)
        .then(x => {
            dispatch({type: CREATE_MAPPING_SUCCESS, mapping});
            callback();
        })
        .catch(error => dispatch({type: CREATE_MAPPING_FAILURE, error}))
}

export const fetchMappingFieldSuggestions = (dispatch: Dispatch<AnyAction>, endpoint: string | undefined) => {
    if (endpoint === undefined) return;
    dispatch({type: FETCH_MAPPING_FIELD_SUGGESTIONS_REQUEST, endpoint});
    getMappingFieldSuggestions(endpoint)
        .then(suggestions => {
            dispatch({type: FETCH_MAPPING_FIELD_SUGGESTIONS_SUCCESS, endpoint, suggestions});
        })
        .catch(error => dispatch({type: FETCH_MAPPING_FIELD_SUGGESTIONS_FAILURE, error}))
}

export const updateMapping = (dispatch: Dispatch<AnyAction>, mapping: AnyMapping) => {
    dispatch({type: UPDATE_MAPPING_REQUEST, mapping});
    putMapping(mapping)
        .then(x => dispatch({type: UPDATE_MAPPING_SUCCESS, mapping}))
        .catch(error => dispatch({type: UPDATE_MAPPING_FAILURE, error}))
}

export const removeMapping = (dispatch: Dispatch<AnyAction>, mapping: AnyMapping) => {
    dispatch({type: DELETE_MAPPING_REQUEST, mapping});
    deleteMapping(mapping)
        .then(x => dispatch({type: DELETE_MAPPING_SUCCESS, mapping}))
        .catch(error => dispatch({type: DELETE_MAPPING_FAILURE, error}))
}
