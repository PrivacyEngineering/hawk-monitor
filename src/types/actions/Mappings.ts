import {AnyMapping, GroupedUsageField, Mapping} from '../types';

import * as types from './Types';

interface FetchMappingsRequestAction {
  type: typeof types.FETCH_MAPPINGS_REQUEST;
}

interface FetchMappingsSuccessAction {
  type: typeof types.FETCH_MAPPINGS_SUCCESS;
  mappings: Mapping[];
}

interface FetchMappingsFailureAction {
  type: typeof types.FETCH_MAPPINGS_FAILURE;
  error: string;
}

export type FetchMappingsActionTypes = FetchMappingsRequestAction | FetchMappingsSuccessAction | FetchMappingsFailureAction;

interface FetchUnmappedEndpointsRequestAction {
  type: typeof types.FETCH_UNMAPPED_ENDPOINTS_REQUEST;
}

interface FetchUnmappedEndpointsSuccessAction {
  type: typeof types.FETCH_UNMAPPED_ENDPOINTS_SUCCESS;
  endpoints: String[];
}

interface FetchUnmappedEndpointsFailureAction {
  type: typeof types.FETCH_UNMAPPED_ENDPOINTS_FAILURE;
  error: string;
}

export type FetchUnmappedEndpointsActionTypes = FetchUnmappedEndpointsRequestAction | FetchUnmappedEndpointsSuccessAction | FetchUnmappedEndpointsFailureAction;

interface FetchMappingFieldSuggestionsRequestAction {
  type: typeof types.FETCH_MAPPING_FIELD_SUGGESTIONS_REQUEST;
  endpoint: string;
}

interface FetchMappingFieldSuggestionsSuccessAction {
  type: typeof types.FETCH_MAPPING_FIELD_SUGGESTIONS_SUCCESS;
  endpoint: string;
  suggestions: GroupedUsageField[];
}

interface FetchMappingFieldSuggestionsFailureAction {
  type: typeof types.FETCH_MAPPING_FIELD_SUGGESTIONS_FAILURE;
  endpoint: string;
  error: string;
}

export type FetchMappingFieldSuggestionsActionTypes = FetchMappingFieldSuggestionsRequestAction | FetchMappingFieldSuggestionsSuccessAction | FetchMappingFieldSuggestionsFailureAction;

interface CreateMappingRequestAction {
  type: typeof types.CREATE_MAPPING_REQUEST;
  mapping: AnyMapping;
}

export interface CreateMappingSuccessAction {
  type: typeof types.CREATE_MAPPING_SUCCESS;
  mapping: AnyMapping;
}

interface CreateMappingFailureAction {
  type: typeof types.CREATE_MAPPING_FAILURE;
  mapping: AnyMapping;
  error: string;
}

export type CreateMappingActionTypes = CreateMappingRequestAction | CreateMappingSuccessAction | CreateMappingFailureAction;

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

interface DeleteMappingRequestAction {
  type: typeof types.DELETE_MAPPING_REQUEST;
  mapping: Mapping;
}

export interface DeleteMappingSuccessAction {
  type: typeof types.DELETE_MAPPING_SUCCESS;
  mapping: Mapping;
}

interface DeleteMappingFailureAction {
  type: typeof types.DELETE_MAPPING_FAILURE;
  mapping: Mapping;
  error: string;
}

export type DeleteMappingActionTypes = DeleteMappingRequestAction | DeleteMappingSuccessAction | DeleteMappingFailureAction;