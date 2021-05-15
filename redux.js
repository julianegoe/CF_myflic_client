// Actions

/* Movies */

const GET_MOVIES = "Get movies";

/* Favorites */

const GET_FAVORITES = "Get favorites";
const TOGGLE_FAVORITE = "Toggle favorite";

/* Users */

const LOGIN_USER = "Login user";
const UPDATE_USER = "Update user";
const DELETE_USER = "Delete user";

/*
const VALIDATE_REGISTER_FORM = "Validate register form";
const VALIDATE_LOGIN_FORM = "Validate login form";
const VALIDATE_UPDATE_FORM = "Validate update form";
*/


// Action Creators

const GetMovies = () => ({
	type: GET_MOVIES,

});

const GeFavorites = () => ({
	type: GET_FAVORITES,
	token
});

const ToggleFavorites = (favId) => ({
	type: TOGGLE_FAVORITE,
	favId
});

const LoginUser = (username, password) => ({
	type: LOGIN_USER,
	username,
	password
});

const UpdateUser = (user) => ({
	type: UPDATE_USER,
	user

});

const DeleteUser = (username) => ({
	type: DELETE_USER,
	username
});


// Reducer


/* Movie State */
const myFlixReducer = (state = [], action) => {
  switch (action.type) {

    case GET_MOVIE: 
    axios.get("https://myflix-0001.herokuapp.com/movies", { headers: { "Authorization": `Bearer ${action.token}` } }
        ).then((res) => {
            return state.map((item) => {
            	(state.length === 0) ? [res.data] : item
            })
        }).catch((e) => {
            console.log(e)
        })

    case ADD_FAVORITE: return []
		/* Put request to add a particular movie to array of favorites. 
		Return new Array of favorites */
	
	case TOGGLE_FAVORITE: return []
		/* If a partucular movie is in Array of favorites, then delete it from 
		array of favorites. If it, is not, add to list of favorites. 
		Return new array of favorites
		*/

	case LOGIN_USER: return {}
		/* Populate state with user data from get request. 
		Save token and username in LocalStorage.
		Return user object.
		*/

	case DELETE_USER: return {}
		/* Delete user from database. Log user out, delete token
		and username from localStorage. 
		Return empty object */

	case UPDATE_USER: return {}
		/* Send new user object to server to udate user info.
		Save potential new usernam in localStorage. 
		Return new user object. */
    }
}





