import React from "react";

export class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movieData) }}>
            <h1>{movieData.Title}</h1>
            <img className="movie-poster" src={movieData.ImagePath} alt="movie poster" />
            <div className="movie-info">
                <p>{"Year: " + movieData.Year}</p>
                <p>{"Director: " + movieData.Director}</p>

            </div>
        </div >

    }
}