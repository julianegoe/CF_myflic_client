import React from "react";
import ReactDom from "react-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: "Inception", Description: "lorem ipsum", ImagePath: "#" },
                { _id: 2, Title: "Young Adult", Description: "lorem ipsum", ImagePath: "#" },
                { _id: 3, Title: "Rope", Description: "lorem ipsum", ImagePath: "#" },
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(clickedMovie) {
        this.setState({
            selectedMovie: clickedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;
        if (selectedMovie) { return <MovieView movieData={selectedMovie} /> };
        if (movies.length === 0) {
            return <div className="main-view">The list is empty!</div>;
        } else {
            return (
                <div className="main-view">
                    {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
                </div>
            );
        }
    }
}