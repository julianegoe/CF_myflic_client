import React from "react";
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movieData) }}>
            <h1>{movieData.Title}</h1>
            <img className="movie-poster" src={movieData.ImageUrl} alt="movie poster" />
            <div className="movie-info">
                <p>{"Year: " + movieData.Year}</p>
                <p>{"Director: " + movieData.Director.Name}</p>
            </div>
        </div >

    }
}

MovieCard.propTypes = {
    movieData: PropTypes.exact({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string
        }).isRequired,
        Year: PropTypes.number.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
        Actors: PropTypes.array.isRequired,
        _id: PropTypes.string.isRequired,
        ImageUrl: PropTypes.string.isRequired,
        Featured: PropTypes.bool.isRequired
    }).isRequired,
    onClick: PropTypes.func
}