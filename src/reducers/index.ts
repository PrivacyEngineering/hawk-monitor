import { infoTypes } from './infoTypes';
import { combineReducers } from 'redux';
import { fields, fieldsBeingCreated, fieldsBeingUpdated, fieldsBeingDeleted } from './fields';
import { legalBases } from './legalBases';
import {
  mappingFieldSuggestions,
  mappings,
  mappingsBeingCreated,
  mappingsBeingDeleted,
  mappingsBeingUpdated, requestedFieldSuggestions, unmappedEndpoints
} from './mappings';

export const app = combineReducers({
  fields,
  fieldsBeingCreated,
  fieldsBeingUpdated,
  fieldsBeingDeleted,
  legalBases,
  infoTypes,
  mappings,
  unmappedEndpoints,
  mappingFieldSuggestions,
  requestedFieldSuggestions,
  mappingsBeingCreated,
  mappingsBeingUpdated,
  mappingsBeingDeleted
});

export type RootState = ReturnType<typeof app>
