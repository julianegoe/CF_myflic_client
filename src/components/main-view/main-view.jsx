import React from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactDom, { render } from "react-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view"

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
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

    render() {
        const { movies, selectedMovie, user } = this.state;
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        console.log(user)
        if (selectedMovie) { return <MovieView goBack={() => { this.setSelectedMovie() }} movieData={selectedMovie} /> };
        if (movies.length === 0) {
            return <div className="main-view" />;
        } else {
            return (
                <div className="main-view">
                    {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
                </div>
            );
        }
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