// Actions

/* Movies */

export const SET_MOVIES = "Set movies";
export const SET_FILTER = 'Set filter';

/* Favorites */

export const GET_FAVORITES = "Get favorites";
export const TOGGLE_FAVORITE = "Toggle favorite";

/* Users */

export const REGISTER_USER = "Register User"
export const LOGIN_USER = "Login user";
export const LOGOUT_USER = "Logout user"
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

export const RegisterUser = (value = {Username: "", Name: "", Email: "", Password: "", Birthday: ""}, field = null) => ({
	type: REGISTER_USER,
	value,
	field
});

export const LoginUser = (value) => ({
	type: LOGIN_USER,
	value
});

export const LogoutUser = () => ({
	type: LOGOUT_USER
});

export const UpdateUser = (value, field = null) => ({
	type: UPDATE_USER,
	value, 
	field

});

export const DeleteUser = (username) => ({
	type: DELETE_USER,
	username
});
