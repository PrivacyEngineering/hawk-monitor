import { combineReducers } from 'redux';
import { fields, fieldsBeingCreated, fieldsBeingUpdated, fieldsBeingDeleted } from './fields';
import { mappings, mappingsBeingUpdated } from './mappings';

export const app = combineReducers({
  fields,
  fieldsBeingCreated,
  fieldsBeingUpdated,
  fieldsBeingDeleted,
  mappings,
  mappingsBeingUpdated,
});

export type RootState = ReturnType<typeof app>
