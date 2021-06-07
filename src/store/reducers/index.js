import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import noteReducer from './noteReducer';

const reducer = combineReducers({
  login: loginReducer,
  note: noteReducer
})

export default reducer;