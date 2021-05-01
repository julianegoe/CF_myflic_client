import React from "react";
import axios from 'axios';
import ReactDom, { render } from "react-dom";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import Divider from "../divider-component/divider-component";
import { RegistrationView } from "../registration-view/registration-view";
import { BootstrapNavbar } from "../bootstrap-navbar/bootstrap-navbar";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            registered: false,
            isLoggedIn: true,
            favorites: []
        };
    }

    setSelectedMovie(clickedMovie) {
        this.setState({
            selectedMovie: clickedMovie
        })
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

    onRegistered(event) {
        this.setState({
            registered: true
        });
    };

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
    }

    render() {
        const { movies, selectedMovie, user, registered, favorites } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) { return <div>Loading...</div> }
        return (
            <>
                <BootstrapNavbar logOut={() => this.logOut()} />
                {
                    !selectedMovie ? <Divider title="All Movies" /> : null
                }
                <Row className="m-5 justify-content-xs-start justify-content-sm-start justify-content-md-start justify-content-lg-start">
                    {
                        selectedMovie ?
                            (

                                <MovieView goBack={() => { this.setSelectedMovie() }} movieData={selectedMovie} />
                            )
                            :

                            movies.map(movie => (

                                <Col xs={12} sm={6} md={4} lg={3} xl={2} className="p-3" key={movie._id}>
                                    <MovieCard movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                                </Col>
                            ))


                    }
                </Row >
                {
                    favorites.length > 0 && !selectedMovie ? (<Divider title="My Favorites" />) : null
                }
            </>
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

