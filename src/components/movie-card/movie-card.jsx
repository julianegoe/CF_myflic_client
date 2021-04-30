import React from "react";
import PropTypes from "prop-types";
import { Container, Card } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import "./movie-card.scss";

export default function MovieCard({ movieData, onMovieClick }) {

    return (
        <>
            <OverlayTrigger
                delay="100"
                placement={'top'}
                overlay={
                    <Tooltip id='tooltip-top'>
                        {movieData.Title} ({movieData.Year})
                    </Tooltip>
                }
            >
                <img onClick={() => { onMovieClick(movieData) }} className="movie-image" src={movieData.ImageUrl} alt={movieData.Title} />
            </OverlayTrigger>
        </>
    );
}


MovieCard.propTypes = {
    movieData: PropTypes.shape({
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