import axios from 'axios';
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


import './movie-view.scss';

export default function MovieView({ movieData, goBack }) {
    const [genreInfo, setGenreInfo] = useState("");
    const [directorInfo, setDirectorInfo] = useState("");

    {/* defining the popover elements */ }
    const popoverGenre = (<Popover id="popover-basic">
        <Popover.Title as="h3">{movieData.Genre.Name}</Popover.Title>
        <Popover.Content>
            {genreInfo}
        </Popover.Content>
    </Popover>);

    const popoverDirector = (<Popover id="popover-basic">
        <Popover.Title as="h3">{movieData.Director.Name}</Popover.Title>
        <Popover.Content>
            {directorInfo}
        </Popover.Content>
    </Popover>);

    {/* requesting data from the genre and director endpoints */ }
    useEffect(() => {
        axios
            .get(`https://myflix-0001.herokuapp.com/genres/${movieData.Genre.Name}`, { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGYXZvcml0ZU1vdmllcyI6W10sIl9pZCI6IjYwOGIwMTUxOWRlMjk5MDAxNTFjZGNkYiIsIk5hbWUiOiJKdWxpYW5lIEfDtnJzY2giLCJVc2VybmFtZSI6InVzZXIxIiwiUGFzc3dvcmQiOiIkMmIkMTAkYnhieUJWZVdOYTczNklVaWZvUUhWLmZKZlpYV1FiZTR2bGVIaGVHZFloL2xwVVlnYXZjRkMiLCJFbWFpbCI6ImdvZXJzY2guanVsaWFuZUBnbWFpbC5jb20iLCJCaXJ0aGRheSI6IjE5ODktMTEtMTlUMDA6MDA6MDAuMDAwWiIsIl9fdiI6MCwiaWF0IjoxNjE5NzIyNjIwLCJleHAiOjE2MjAzMjc0MjAsInN1YiI6InVzZXIxIn0.hn9L143-8wDuo0LyZH2Y1zcOJyXe-cXKFFSql-CXwIk` } })
            .then((res) => {
                setGenreInfo(res.data.Description);
                console.log(res.data);
            })
            .catch((e) => console.log(e));
    }, [setGenreInfo]);

    useEffect(() => {
        axios
            .get(`https://myflix-0001.herokuapp.com/directors/${movieData.Director.Name}`, { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGYXZvcml0ZU1vdmllcyI6W10sIl9pZCI6IjYwOGIwMTUxOWRlMjk5MDAxNTFjZGNkYiIsIk5hbWUiOiJKdWxpYW5lIEfDtnJzY2giLCJVc2VybmFtZSI6InVzZXIxIiwiUGFzc3dvcmQiOiIkMmIkMTAkYnhieUJWZVdOYTczNklVaWZvUUhWLmZKZlpYV1FiZTR2bGVIaGVHZFloL2xwVVlnYXZjRkMiLCJFbWFpbCI6ImdvZXJzY2guanVsaWFuZUBnbWFpbC5jb20iLCJCaXJ0aGRheSI6IjE5ODktMTEtMTlUMDA6MDA6MDAuMDAwWiIsIl9fdiI6MCwiaWF0IjoxNjE5NzIyNjIwLCJleHAiOjE2MjAzMjc0MjAsInN1YiI6InVzZXIxIn0.hn9L143-8wDuo0LyZH2Y1zcOJyXe-cXKFFSql-CXwIk` } })
            .then((res) => {
                setDirectorInfo(res.data.Bio);
                console.log(res.data);
            })
            .catch((e) => console.log(e));
    }, [setDirectorInfo]);

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

                        {/* Clicking the director name will open a popover */}
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popoverDirector}>
                            <div className="category">
                                {movieData.Director.Name}
                            </div>
                        </OverlayTrigger>
                    </Col>

                    {/* Clicking the genre name will open a popover */}
                    <Col sm={4} md={4}>
                        <div className="categories">Genre</div>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popoverGenre}>
                            <div className="category">
                                {movieData.Genre.Name}
                            </div>
                        </OverlayTrigger>
                    </Col>

                    {/* ToDo: Adding a cast list to data in MongoDB */}
                    <Col sm={4} md={4}>
                        <div className="categories">Cast</div>
                        <ul>
                            {movieData.Actors.map(actor => (<li>{actor}</li>))}
                        </ul>
                    </Col>
                </Row>
            </Col>

            {/* This is the back button spanning all Bootstrap columns */}
            <Col md={12}>
                <Button className="bg-button" variant="dark" onClick={() => { goBack(null) }}>Back</Button>
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
    goBack: PropTypes.func
}