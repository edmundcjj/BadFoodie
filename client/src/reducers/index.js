import { combineReducers } from 'redux';
import reviews from './reviews_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
  reviews,
  user
});

export default rootReducer;
