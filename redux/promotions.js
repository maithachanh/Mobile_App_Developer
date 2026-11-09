import * as ActionTypes from './ActionTypes';

export const promotions = (state = { isLoading: false, errMess: null, promotions: [] }, action) => {
  switch (action.type) {
    case ActionTypes.PROMOS_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.ADD_PROMOS:
      return { ...state, isLoading: false, promotions: action.payload };
    case ActionTypes.PROMOS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};