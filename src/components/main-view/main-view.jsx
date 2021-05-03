import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ReactDom, { render } from "react-dom";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import ProfileView from "../profile-view/profile-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { BootstrapNavbar } from "../bootstrap-navbar/bootstrap-navbar";
import Divider from "../divider-component/divider-component";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            user: null,
        };
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        console.info("user logged in")
    }

    getMovies(token) {
        axios.get("https://myflix-0001.herokuapp.com/movies", { headers: { "Authorization": `Bearer ${token}` } }
        ).then((res) => {
            console.log(res.data);
            this.setState({ movies: res.data })
        }).catch((e) => {
            console.log(e)
        })
    };

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
        console.info("user logged out")
    };



    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <BootstrapNavbar userState={user} logOut={() => this.logOut()} />
                <Row className="m-5 justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-lg-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        if (movies.length === 0) { return <div>Loading...</div> }
                        { movies.length > 0 && <Divider title="All Movies" /> }
                        return movies.map(movie => (
                            <Col xs={12} sm={6} md={4} lg={3} xl={2} className="p-3" key={movie._id}>
                                <MovieCard movieData={movie} />
                            </Col>
                        ))
                    }} />

                    <Route exact path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <RegistrationView />
                    }} />

                    <Route exact path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        if (movies.length === 0) return <div className="main-view" />;
                        return <MovieView bla={() => { console.info("fav clicked") }} movieData={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                    }} />

                    <Route exact path="/profile" render={() => {
                        return <ProfileView movies={movies} />
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
            this.getMovies(accessToken)
        }
    }

}

