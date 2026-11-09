import * as ActionTypes from "./ActionTypes";

export const leaders = (
  state = { isLoading: false, errMess: null, leaders: [] },
  action,
) => {
  switch (action.type) {
    case ActionTypes.LEADERS_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.ADD_LEADERS:
      return { ...state, isLoading: false, leaders: action.payload };
    case ActionTypes.LEADERS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
