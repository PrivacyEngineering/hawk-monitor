import { combineReducers } from 'redux';
import { fields } from './fields';
import { mappings } from './mappings';

export const app = combineReducers({
  fields,
  mappings,
});

export type RootState = ReturnType<typeof app>
