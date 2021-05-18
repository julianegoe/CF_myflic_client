// Actions

/* Movies */

export const SET_MOVIES = "Set movies";
export const SET_FILTER = 'Set filter';

/* Favorites */

export const GET_FAVORITES = "Get favorites";
export const TOGGLE_FAVORITE = "Toggle favorite";

/* Users */

export const VALIDATE_USER = "Validate User";
export const SET_USER = "Set user";
export const LOGOUT_USER = "Logout user"
export const DELETE_USER = "Delete user";


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

export const ToggleFavorites = (value, field = "FavoriteMovies") => ({
	type: TOGGLE_FAVORITE,
	value,
	field
});


export const ValidateUser = (value = {Username: "", Name: "", Email: "", Password: "", Birthday: ""}, field = null) => ({
	type: VALIDATE_USER,
	value,
	field
});

export const SetUser = (value) => ({
	type: SET_USER,
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
