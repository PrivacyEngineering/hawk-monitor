import { combineReducers } from 'redux';
import { mappings } from './mappings';

export const app = combineReducers({
  mappings
});

export type RootState = ReturnType<typeof app>
