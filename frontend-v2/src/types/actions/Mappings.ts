import { ThunkAction } from 'redux-thunk';
import { Mapping } from '../../types';

import * as types from './Types';

interface UpdateMappingRequestAction {
  type: typeof types.UPDATE_MAPPING_REQUEST;
  mapping: Mapping;
}

export interface UpdateMappingSuccessAction {
  type: typeof types.UPDATE_MAPPING_SUCCESS;
  mapping: Mapping;
}

interface UpdateMappingFailureAction {
  type: typeof types.UPDATE_MAPPING_FAILURE;
  mapping: Mapping;
  error: string;
}

export type UpdateMappingActionTypes = UpdateMappingRequestAction | UpdateMappingSuccessAction | UpdateMappingFailureAction;
export type UpdateMappingThunkAction = ThunkAction<Promise<any>, any, null, UpdateMappingActionTypes>;
