import { AnyMapping, Mapping } from '../../types';

import * as types from './Types';

interface FetchMappingsRequestAction {
  type: typeof types.FETCH_MAPPINGS_REQUEST;
}

interface FetchMappingsSuccessAction {
  type: typeof types.FETCH_MAPPINGS_SUCCESS;
  mappings: AnyMapping[];
}

interface FetchMappingsFailureAction {
  type: typeof types.FETCH_MAPPINGS_FAILURE;
  error: string;
}

export type FetchMappingsActionTypes = FetchMappingsRequestAction | FetchMappingsSuccessAction | FetchMappingsFailureAction;

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
