import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { SetMovies, SetUser, LogoutUser } from '../../actions/actions';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ReactDom, { render } from "react-dom";
import MovieView from "../movie-view/movie-view";
import ProfileView from "../profile-view/profile-view";
import { LoginView } from "../login-view/login-view";
import MoviesList from "../movie-list/movie-list";
import RegistrationView from "../registration-view/registration-view";
import { BootstrapNavbar } from "../bootstrap-navbar/bootstrap-navbar";

import Row from 'react-bootstrap/Row';
import './main-view.scss';

let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user
    }
}

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            favorites: []
        };
    }

    onLoggedIn(authData) {
        let userData = { ...authData.user, Birthday: authData.user.Birthday.substring(0, 10) }
        this.props.SetUser(userData);
        this.setState({
            favorites: authData.user.FavoriteMovies
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get("https://myflix-0001.herokuapp.com/movies", { headers: { "Authorization": `Bearer ${token}` } }
        ).then((res) => {
            this.props.SetMovies(res.data);
        }).catch((e) => {
            console.log(e)
        })
    };

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.LogoutUser();
    };


    render() {
        const { movies } = this.props;
        const { user } = this.props
        const localUser = localStorage.getItem('user')

        return (
            <Router>
                <BootstrapNavbar userState={user} logOut={() => this.logOut()} />
                <Row className="m-5 justify-content-xs-start justify-content-sm-start justify-content-md-start justify-content-lg-start">
                    <Route exact path="/" render={() => {
                        if (!localUser) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        if (movies.length === 0) { return <div>Loading...</div> }
                        return <MoviesList movies={movies} />
                    }} />

                    <Route exact path="/register" render={() => {
                        if (localUser) return <Redirect to="/" />
                        return <RegistrationView />
                    }} />

                    <Route exact path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        if (movies.length === 0) return <div className="main-view" />;
                        return <MovieView setFavState={() => this.setState} movieData={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                    }} />

                    <Route exact path="/profile" render={() => {
                        return <ProfileView logOut={() => this.logOut()} movies={movies} user={user} />
                    }} />
                </Row >
            </Router>
        )
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

}


export default connect(mapStateToProps, { SetMovies, SetUser, LogoutUser })(MainView);
