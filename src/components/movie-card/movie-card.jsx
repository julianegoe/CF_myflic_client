import React from "react";

export class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;
        return <div className="movie-card">
            <h1 onClick={() => { onMovieClick(movieData) }}>{movieData.Title}</h1>
            <img src={movieData.ImagePath} />
        </div >

    }
}