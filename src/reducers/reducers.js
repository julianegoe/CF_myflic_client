// src/reducers/reducers.js
import { combineReducers } from 'redux';

import { SET_USER, SET_FILTER, SET_MOVIES, LOGOUT_USER, TOGGLE_FAVORITE, VALIDATE_USER } from '../actions/actions';

const visibilityFilter = (state = '', action) => {
    switch (action.type) {
        case SET_FILTER: return action.value;

        default: return state
    }
};

const movies = (state = [], action) => {
    switch (action.type) {
        case SET_MOVIES: return action.value;

        default: return state
    }
};

const user = (state = {
    Username: "", 
    Name: "", 
    Email: "", 
    Password: "", 
    Birthday: "", 
    FavoriteMovies: []} , action) => {
    const { field, value } = action;
    switch (action.type) {

        case SET_USER: return value;

        case VALIDATE_USER: return {
            ...state,
            [field] : value
          };

        case LOGOUT_USER: return {
            Username: "", 
            Name: "", 
            Email: "", 
            Password: "", 
            Birthday: "", 
            FavoriteMovies: []} ;


        case TOGGLE_FAVORITE:
            return {
                ...state,
                [field] : [...value]
            }

        default: return state
    }
}


const movieApp = combineReducers({
    visibilityFilter,
    movies, 
    user
})

export default movieApp;