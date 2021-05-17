// src/reducers/reducers.js
import { combineReducers } from 'redux';

import { LOGIN_USER, SET_FILTER, SET_MOVIES, UPDATE_USER, LOGOUT_USER, REGISTER_USER } from '../actions/actions';

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

const user = (state = null, action) => {
    const { field, value } = action;
    switch (action.type) {
        case REGISTER_USER: 
        return {
            ...state,
            [field] : value
          };

        case LOGIN_USER: return action.value;

        case LOGOUT_USER: return null;

        case UPDATE_USER: 
        return {
            ...state,
            [field] : value
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