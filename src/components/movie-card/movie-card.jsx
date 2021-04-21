import React from "react";
import PropTypes from 'prop-types';
import './movie-card.scss';
import Card from 'react-bootstrap/Card'

export class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;
        return <Card onClick={() => { onMovieClick(movieData) }} className="card bg-dark text-white">
            <Card.Img src={movieData.ImageUrl} alt="Card image" className="movie-poster" />
            <Card.ImgOverlay className="card-overlay p-0 d-flex align-items-end">
                <Card.Body className="card-title mb-0 p-2">{movieData.Title}</Card.Body>
            </Card.ImgOverlay>
        </Card>

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