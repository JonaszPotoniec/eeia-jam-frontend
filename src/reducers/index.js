import { authReducer } from '../reducers/authReducer';

function combineReducers(reducers) {  
    return (state = {}, action) => {
      const newState = {};
      for (let key in reducers) {
        newState[key] = reducers[key](state[key], action);
      }
      return newState;
    }
  }

export const rootReducer = combineReducers({ 
    user: authReducer 
});