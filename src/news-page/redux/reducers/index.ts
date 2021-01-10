import { combineReducers } from 'redux';
import { getDataReducer } from './DataReducer';

const rootReducer = combineReducers({
  data: getDataReducer
});

export default rootReducer;
