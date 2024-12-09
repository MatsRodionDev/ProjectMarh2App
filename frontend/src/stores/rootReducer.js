import { combineReducers } from '@reduxjs/toolkit';
import roleReducer from './slices/roleSlice.js'
import accountReducer from './slices/accountSlice.js'

const rootReducer = combineReducers({
  role: roleReducer,
  account: accountReducer
});

export default rootReducer;