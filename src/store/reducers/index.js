import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import userReducer from './userReducer';
import noteReducer from './noteReducer';

const reducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  note: noteReducer,
})

export default reducer;