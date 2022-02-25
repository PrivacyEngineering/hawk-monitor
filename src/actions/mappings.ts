import { getMappings, putMapping } from "gateways/mappings";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { AnyMapping } from "types";
import { FETCH_MAPPINGS_FAILURE, FETCH_MAPPINGS_REQUEST, FETCH_MAPPINGS_SUCCESS, UPDATE_MAPPING_FAILURE, UPDATE_MAPPING_REQUEST, UPDATE_MAPPING_SUCCESS } from "types/actions/Types";

export const fetchMappings = (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: FETCH_MAPPINGS_REQUEST });
  getMappings()
    .then(mappings => dispatch({ type: FETCH_MAPPINGS_SUCCESS, mappings }))
    .catch(error => dispatch({ type: FETCH_MAPPINGS_FAILURE, error }))
}

export const updateMapping = (dispatch: Dispatch<AnyAction>, mapping: AnyMapping) => {
  dispatch({ type: UPDATE_MAPPING_REQUEST, mapping });
  putMapping(mapping)
    .then(mapping => dispatch({ type: UPDATE_MAPPING_SUCCESS, mapping }))
    .catch(error => dispatch({ type: UPDATE_MAPPING_FAILURE, error }))
}
