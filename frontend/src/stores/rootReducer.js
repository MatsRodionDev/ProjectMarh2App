import { combineReducers } from '@reduxjs/toolkit';
import roleReducer from './slices/roleSlice.js'

const rootReducer = combineReducers({
  role: roleReducer,
});

export default rootReducer;