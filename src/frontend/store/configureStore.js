import { createStore, combineReducers } from 'redux';
import feedbackReducer from '../reducers/feedback';
import authReducer from '../reducers/auth';
import searchReducer from '../reducers/filters';

export default () => {
  const store = createStore(combineReducers({
    feedback: feedbackReducer,
    auth: authReducer,
    search: searchReducer
  }));
  return store;
};
