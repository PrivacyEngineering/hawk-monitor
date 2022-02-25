import { ThunkAction } from 'redux-thunk';
import { Field } from '../../types';

import * as types from './Types';

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
