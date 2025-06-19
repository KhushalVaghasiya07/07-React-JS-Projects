export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const SET_SEARCH = 'SET_SEARCH';

export const addRecipe = (recipe) => ({
  type: ADD_RECIPE,
  payload: recipe
});

export const deleteRecipe = (id) => ({
  type: DELETE_RECIPE,
  payload: id
});

export const updateRecipe = (recipe) => ({
  type: UPDATE_RECIPE,
  payload: recipe
});

export const setSearch = (term) => ({
  type: SET_SEARCH,
  payload: term
});