import { combineReducers } from 'redux';
import { fields, fieldsBeingCreated, fieldsBeingUpdated, fieldsBeingDeleted } from './fields';
import { legalBases } from './legalBases';
import { mappings, mappingsBeingUpdated } from './mappings';

export const app = combineReducers({
  fields,
  fieldsBeingCreated,
  fieldsBeingUpdated,
  fieldsBeingDeleted,
  legalBases,
  mappings,
  mappingsBeingUpdated,
});

export type RootState = ReturnType<typeof app>
