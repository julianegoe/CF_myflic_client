import React from "react";
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

    render() {
        const { movieData, goBack } = this.props;
        return <div className="movie-view">
            <h1 className="movie-title">{movieData.Title}</h1>
            <span className="movie-year">{movieData.Year}</span>
            <span className="movie-director">{" Directed by " + movieData.Director.Name}</span>
            <div className="movie-section">
                <img className="movie-poster" src={movieData.ImageUrl} alt="movie poster" />
                <div className="movie-description">{movieData.Description}</div>
            </div>
            <button className="back-button" onClick={() => { goBack(null) }}>Back</button>

        </div >
    }

}


MovieView.propTypes = {
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
    goBack: PropTypes.func
}