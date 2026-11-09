import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

// leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());
  setTimeout(() => {
  return fetch(baseUrl + "/leaders")
    .then((response) => {
      if (!response.ok)
        throw Error("Error " + response.status + ": " + response.statusText);
      else return response.json();
    })
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
  }, 2000);
};
const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});
const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});
const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

// dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());
  setTimeout(() => {
  return fetch(baseUrl + "/dishes")
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
  }, 2000);
};
const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});
const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});
const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

// comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "/comments")
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};
const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});
const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
    date: new Date().toISOString()
  };
  setTimeout(() => {
    dispatch(addComment(newComment));
  }, 1000);
};

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

// promotions
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());
  setTimeout(() => {
  return fetch(baseUrl + "/promotions")
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
  }, 2000);
};
const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});
const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

// favorites
export const postFavorite = (dishId) => (dispatch) => {
  dispatch(addFavorite(dishId));
};
const addFavorite = (dishId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId
});
