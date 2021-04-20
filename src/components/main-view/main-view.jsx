import React from "react";
import axios from 'axios';
import ReactDom, { render } from "react-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { Divider } from "../divider-component/divider-component";
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
            isLoggedIn: true
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
        const { movies, selectedMovie, user, registered } = this.state;
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
                <Row className="main-view mx-5 mb-5">
                    {
                        selectedMovie ?
                            (

                                <Col md={6}>
                                    <MovieView goBack={() => { this.setSelectedMovie() }} movieData={selectedMovie} />
                                </Col>
                            )
                            :

                            movies.map(movie => (

                                <Col sm={6} md={2} className="p-3" key={movie._id}>
                                    <MovieCard movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                                </Col>
                            ))


                    }
                </Row >
                {
                    !selectedMovie ? <Divider title="My Favorites" /> : null
                }
            </>
        )
    }

    componentDidMount() {
        axios.get("https://myflix-0001.herokuapp.com/movies", { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGYXZvcml0ZU1vdmllcyI6W10sIl9pZCI6IjYwNzk3MDQ0MDk2MDFkMDAxNThkNGIwYSIsIk5hbWUiOiJKdWxpYW5lIEfDtnJzY2giLCJVc2VybmFtZSI6Imp1bGlhbmUiLCJQYXNzd29yZCI6IiQyYiQxMCRNaU9oVWJBb1pGM1ZRTzhqM0RacFIuZlFxSWowMGpVdVFHMHhzOGdJc2pYZDZIMDQ3eFlrTyIsIkVtYWlsIjoiZ29lcnNjaC5qdWxpYW5lQGdtYWlsLmNvbSIsIkJpcnRoZGF5IjoiMTk4OS0xMS0xOVQwMDowMDowMC4wMDBaIiwiX192IjowLCJpYXQiOjE2MTg1NzEzNTIsImV4cCI6MTYxOTE3NjE1Miwic3ViIjoianVsaWFuZSJ9.-S66_893BpyUuEBr7rEEkgW3d3j7628xIQSQ9kQ3-C0` } }
        ).then((res) => {
            this.setState({ movies: res.data })
        }).catch((e) => {
            console.log(e)
        })
    }

}