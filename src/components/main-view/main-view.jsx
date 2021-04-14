import React from "react";
import ReactDom, { render } from "react-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: "Inception", Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", ImagePath: "../../src/img/inception.jpeg" },
                { _id: 2, Title: "Young Adult", Description: "Soon after her divorce, a fiction writer returns to her home in small-town Minnesota, looking to rekindle a romance with her ex-boyfriend, who is now happily married and has a newborn daughter.", ImagePath: "../../src/img/young_adult.jpeg" },
                { _id: 3, Title: "Rope", Description: "Two men attempt to prove they committed the perfect crime by hosting a dinner party after strangling their former classmate to death.", ImagePath: "../../src/img/rope.jpeg" },
            ],
            selectedMovie: null,
        };
    }

    setSelectedMovie(clickedMovie) {
        this.setState({
            selectedMovie: clickedMovie
        })
    }

    render() {
        const { movies, selectedMovie } = this.state;
        if (selectedMovie) { return <MovieView goBack={() => { this.setSelectedMovie() }} movieData={selectedMovie} /> };
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