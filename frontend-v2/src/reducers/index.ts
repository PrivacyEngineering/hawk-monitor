import { combineReducers } from 'redux';
import { fields, fieldsBeingCreated, fieldsBeingUpdated, fieldsBeingDeleted } from './fields';
import { mappings } from './mappings';

export const app = combineReducers({
  fields,
  fieldsBeingCreated,
  fieldsBeingUpdated,
  fieldsBeingDeleted,
  mappings,
});

export type RootState = ReturnType<typeof app>
