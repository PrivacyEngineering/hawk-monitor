import { Field } from '../../types';

import * as types from './Types';

interface FetchFieldsRequestAction {
  type: typeof types.FETCH_FIELDS_REQUEST;
}

interface FetchFieldsSuccessAction {
  type: typeof types.FETCH_FIELDS_SUCCESS;
  fields: Field[];
}

interface FetchFieldsFailureAction {
  type: typeof types.FETCH_FIELDS_FAILURE;
  error: string;
}

export type FetchFieldsActionTypes = FetchFieldsRequestAction | FetchFieldsSuccessAction | FetchFieldsFailureAction;

interface CreateFieldRequestAction {
  type: typeof types.CREATE_FIELD_REQUEST;
  field: Field;
}

export interface CreateFieldSuccessAction {
  type: typeof types.CREATE_FIELD_SUCCESS;
  field: Field;
}

interface CreateFieldFailureAction {
  type: typeof types.CREATE_FIELD_FAILURE;
  field: Field;
  error: string;
}

export type CreateFieldActionTypes = CreateFieldRequestAction | CreateFieldSuccessAction | CreateFieldFailureAction;

interface UpdateFieldRequestAction {
  type: typeof types.UPDATE_FIELD_REQUEST;
  field: Field;
}

export interface UpdateFieldSuccessAction {
  type: typeof types.UPDATE_FIELD_SUCCESS;
  field: Field;
}

interface UpdateFieldFailureAction {
  type: typeof types.UPDATE_FIELD_FAILURE;
  field: Field;
  error: string;
}

export type UpdateFieldActionTypes = UpdateFieldRequestAction | UpdateFieldSuccessAction | UpdateFieldFailureAction;

interface DeleteFieldRequestAction {
  type: typeof types.DELETE_FIELD_REQUEST;
  field: Field;
}

export interface DeleteFieldSuccessAction {
  type: typeof types.DELETE_FIELD_SUCCESS;
  field: Field;
}

interface DeleteFieldFailureAction {
  type: typeof types.DELETE_FIELD_FAILURE;
  field: Field;
  error: string;
}

export type DeleteFieldActionTypes = DeleteFieldRequestAction | DeleteFieldSuccessAction | DeleteFieldFailureAction;
