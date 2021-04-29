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

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onRegistered(event) {
        this.setState({
            registered: true
        });
    }

    render() {
        const { movies, selectedMovie, user, registered, favorites } = this.state;
        /*         if (!registered) return <RegistrationView onRegistered={event => this.onRegistered(event)} />;
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
         */
        if (movies.length === 0) { return <div>Empty</div> }
        return (
            <>
                <BootstrapNavbar />
                {
                    !selectedMovie ? <Divider title="All Movies" /> : null
                }
                <Row className="m-5 justify-content-md-start">
                    {
                        selectedMovie ?
                            (

                                <MovieView goBack={() => { this.setSelectedMovie() }} movieData={selectedMovie} />
                            )
                            :

                            movies.map(movie => (

                                <Col xs={6} md={3} lg={3} xl={2} className="p-3" key={movie._id}>
                                    <MovieCard movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                                </Col>
                            ))


                    }
                </Row >
                {
                    favorites.length > 0 ? <Divider title="My Favorites" /> : null
                }
            </>
        )
    }

    componentDidMount() {
        axios.get("https://myflix-0001.herokuapp.com/movies", { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGYXZvcml0ZU1vdmllcyI6W10sIl9pZCI6IjYwOGIwMTUxOWRlMjk5MDAxNTFjZGNkYiIsIk5hbWUiOiJKdWxpYW5lIEfDtnJzY2giLCJVc2VybmFtZSI6InVzZXIxIiwiUGFzc3dvcmQiOiIkMmIkMTAkYnhieUJWZVdOYTczNklVaWZvUUhWLmZKZlpYV1FiZTR2bGVIaGVHZFloL2xwVVlnYXZjRkMiLCJFbWFpbCI6ImdvZXJzY2guanVsaWFuZUBnbWFpbC5jb20iLCJCaXJ0aGRheSI6IjE5ODktMTEtMTlUMDA6MDA6MDAuMDAwWiIsIl9fdiI6MCwiaWF0IjoxNjE5NzIyNjIwLCJleHAiOjE2MjAzMjc0MjAsInN1YiI6InVzZXIxIn0.hn9L143-8wDuo0LyZH2Y1zcOJyXe-cXKFFSql-CXwIk` } }
        ).then((res) => {
            this.setState({ movies: res.data })
        }).catch((e) => {
            console.log(e)
        })
    }

}