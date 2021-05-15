// src/reducers/reducers.js
import { combineReducers } from 'redux';

import { LOGIN_USER, SET_FILTER, SET_MOVIES, UPDATE_USER } from '../actions/actions';

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

const user = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER: return action.user;

        case UPDATE_USER: 
        const { field, value } = action;
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