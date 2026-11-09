import * as ActionTypes from './ActionTypes';

export const dishes = (state = { isLoading: false, errMess: null, dishes: [] }, action) => {
  switch (action.type) {
    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.ADD_DISHES:
      return { ...state, isLoading: false, dishes: action.payload };
    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};