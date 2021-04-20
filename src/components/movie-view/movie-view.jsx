import React from "react";
import PropTypes from 'prop-types';
import './movie-view.scss';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

    render() {
        const { movieData, goBack } = this.props;
        return (
            <>
                <h1 className="movie-title">{movieData.Title}</h1>
                <div>
                    <span className="movie-year">{movieData.Year}</span>
                    <span className="movie-director">{" Directed by " + movieData.Director.Name}</span>
                </div>
                <img className="movie-poster" src={movieData.ImageUrl} alt="movie poster" />
                <div className="movie-description">{movieData.Description}</div>

                <Button onClick={() => { goBack(null) }}>Back</Button>
            </>
        )

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