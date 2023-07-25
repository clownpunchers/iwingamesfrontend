// rootReducer.js

import { combineReducers } from 'redux';
import authReducer from './authSlice';
import adminReducer from './adminSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
});

export default rootReducer;