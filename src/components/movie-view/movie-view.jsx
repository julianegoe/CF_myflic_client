import axios from 'axios';
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';



import './movie-view.scss';

export default function MovieView({ movieData, onBackClick }) {
    const [genreInfo, setGenreInfo] = useState("");
    const [directorInfo, setDirectorInfo] = useState("");

    return (
        <>
            {/* This is the title element spanning all Bootstrap columns */}
            <Col md={12}>
                <h3>{movieData.Title} ({movieData.Year})</h3>
            </Col>

            {/* This is the image element  */}
            <Col md="auto" className="p-3">
                <img className="movie-view" src={movieData.ImageUrl} alt={movieData.Title} />
            </Col>

            {/* This is the info colums containing nested columns for genre, director and cast */}
            <Col md={8} className="right-column p-3">
                <p>{movieData.Description}</p>
                <hr className="solid" />
                <Row>
                    <Col sm={4} md={4}>
                        <div className="font-weight-bold">Director</div>

                        <div className="category">
                            {movieData.Director.Name}
                        </div>
                        <p>{movieData.Director.Bio}</p>
                    </Col>

                    <Col sm={4} md={4}>
                        <div className="categories">Genre</div>
                        <div className="category">
                            {movieData.Genre.Name}
                        </div>
                    </Col>

                    {/* ToDo: Adding a cast list to data in MongoDB */}
                    <Col sm={4} md={4}>
                        <div className="categories">Cast</div>
                        <ul>
                            {movieData.Actors.map(actor => <li key={actor}>{actor}</li>)}
                        </ul>
                    </Col>
                </Row>
            </Col>

            {/* This is the back button spanning all Bootstrap columns */}
            <Col md={12}>
                <Button onClick={() => { onBackClick() }} className="bg-button" variant="dark">Back</Button>
            </Col>
        </>
    )

}


MovieView.propTypes = {
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
    onBackClick: PropTypes.func.isRequired
}