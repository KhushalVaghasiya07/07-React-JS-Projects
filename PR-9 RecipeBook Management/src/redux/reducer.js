import { ADD_RECIPE, DELETE_RECIPE, UPDATE_RECIPE, SET_SEARCH } from './actions';

const initialState = {
  recipes: [],
  searchTerm: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.recipes]
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(r => r.id !== action.payload)
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map(r =>
          r.id === action.payload.id ? action.payload : r
        )
      };
    case SET_SEARCH:
      return {
        ...state,
        searchTerm: action.payload
      };
    default:
      return state;
  }
}