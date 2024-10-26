import { combineReducers } from '@reduxjs/toolkit';
import roleReducer from './slices/roleslice.js'
// Импортируйте другие редюсеры здесь

const rootReducer = combineReducers({
  role: roleReducer,
});

export default rootReducer;