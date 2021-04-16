import React from "react";
import ReactDom, { render } from "react-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: "Inception", Year: 2010, Director: "Christopher Nolan", Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", ImagePath: "https://media.outnow.ch/Movies/Bilder/2010/Inception/posters.p/12.jpg" },
                { _id: 2, Title: "Young Adult", Year: 2011, Director: "Jason Reitman", Description: "Soon after her divorce, a fiction writer returns to her home in small-town Minnesota, looking to rekindle a romance with her ex-boyfriend, who is now happily married and has a newborn daughter.", ImagePath: "https://media.outnow.ch/Movies/Bilder/2011/YoungAdult/posters.p/01.jpg" },
                { _id: 3, Title: "Rope", Year: 1948, Director: "Alfred Hitchcock", Description: "Two men attempt to prove they committed the perfect crime by hosting a dinner party after strangling their former classmate to death.", ImagePath: "https://cdn.shopify.com/s/files/1/1416/8662/products/rope_1948_original_film_art_5000x.jpg" },
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