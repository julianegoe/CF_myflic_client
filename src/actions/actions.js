// Actions

/* Movies */

export const SET_MOVIES = "Set movies";
export const SET_FILTER = 'Set filter';

/* Favorites */

export const GET_FAVORITES = "Get favorites";
export const TOGGLE_FAVORITE = "Toggle favorite";

/* Users */

export const LOGIN_USER = "Login user";
export const UPDATE_USER = "Update user";
export const DELETE_USER = "Delete user";

/*
const VALIDATE_REGISTER_FORM = "Validate register form";
const VALIDATE_LOGIN_FORM = "Validate login form";
const VALIDATE_UPDATE_FORM = "Validate update form";
*/


// Action Creators

export function SetMovies(value) {
	return {
	type: SET_MOVIES,
	value}
}


export const SetFilter = (value) => ({
	type: SET_FILTER, value

});

export const GeFavorites = () => ({
	type: GET_FAVORITES,
	token
});

export const ToggleFavorites = (favId) => ({
	type: TOGGLE_FAVORITE,
	favId
});

export const LoginUser = (username, password) => ({
	type: LOGIN_USER,
	username,
	password
});

export const UpdateUser = (user) => ({
	type: UPDATE_USER,
	user

});

export const DeleteUser = (username) => ({
	type: DELETE_USER,
	username
});
