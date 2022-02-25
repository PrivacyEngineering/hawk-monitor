import { getFields, postField, putField } from "gateways/fields";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Field } from "types";
import { CREATE_FIELD_FAILURE, CREATE_FIELD_REQUEST, CREATE_FIELD_SUCCESS, FETCH_FIELDS_FAILURE, FETCH_FIELDS_REQUEST, FETCH_FIELDS_SUCCESS, UPDATE_FIELD_FAILURE, UPDATE_FIELD_REQUEST, UPDATE_FIELD_SUCCESS, } from "types/actions/Types";

export const fetchFields = (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: FETCH_FIELDS_REQUEST });
  getFields()
    .then(fields => dispatch({ type: FETCH_FIELDS_SUCCESS, fields }))
    .catch(error => dispatch({ type: FETCH_FIELDS_FAILURE, error }))
}

export const createField = (dispatch: Dispatch<AnyAction>, field: Field) => {
  dispatch({ type: CREATE_FIELD_REQUEST, field });
  postField(field)
    .then(() => dispatch({ type: CREATE_FIELD_SUCCESS, field }))
    .catch(error => dispatch({ type: CREATE_FIELD_FAILURE, error }))
}

export const updateField = (dispatch: Dispatch<AnyAction>, field: Field) => {
  dispatch({ type: UPDATE_FIELD_REQUEST, field });
  putField(field)
    .then(() => dispatch({ type: UPDATE_FIELD_SUCCESS, field }))
    .catch (error => dispatch({ type: UPDATE_FIELD_FAILURE, error }))
}
