import { combineReducers } from 'redux';
import { mappings, unhandeldMappings } from './mappings';

export const app = combineReducers({
  mappings,
  unhandeldMappings
});

export type RootState = ReturnType<typeof app>
