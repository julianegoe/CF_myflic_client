import axios from 'axios';
import { connect } from 'react-redux';
import { ToggleFavorites } from '../../actions/actions';
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import GenreView from "../genre-view/genre-view";
import DirectorView from "../director-view/director-view";
import Snackbar from '../snackbar-component/snackbar-component'



import './movie-view.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

function MovieView({ user, movieData, onBackClick, ToggleFavorites }) {


    const toggleFav = () => {
        const token = localStorage.getItem('token');
        const localUser = localStorage.getItem('user');
        user.FavoriteMovies.includes(movieData._id) ?
            axios.delete(`https://myflix-0001.herokuapp.com/users/${localUser}/movies/${movieData._id}`, { headers: { "Authorization": `Bearer ${token}` } }
            ).then((res) => {
                console.log(res.data.FavoriteMovies);
                ToggleFavorites(res.data.FavoriteMovies);
            }).catch((e) => { console.log(e) })

            :

            axios.put(`https://myflix-0001.herokuapp.com/users/${localUser}/movies/${movieData._id}`, {}, { headers: { "Authorization": `Bearer ${token}` } }
            ).then((res) => {
                console.log(res.data.FavoriteMovies);
                ToggleFavorites(res.data.FavoriteMovies)
            }).catch((e) => {
                console.log(e.message)
            })
    }


    return (
        <>
            {/* This is the title element spanning all Bootstrap columns */}
            <Col className="mt-5" md={12}>
                <h3>{movieData.Title} ({movieData.Year})</h3>
            </Col>

            {/* This is the image element  */}
            <Col md="auto" className="p-3">
                <img className="movie-view" src={movieData.ImageUrl} alt={movieData.Title} /><br />
                <div onClick={toggleFav} className="favstar mt-2">{
                    user.FavoriteMovies.includes(movieData._id) ?
                        <>
                            <i className="bi bi-star-fill m-3"></i>
                            <span>Remove Favorite</span>
                        </> : <>
                            <i className="bi bi-star m-3"></i>
                            <span>Add Favorite</span>
                        </>

                }</div>

                {/* This is the back button spanning all Bootstrap columns */}
                <Row>
                    <Col md={12} className="mt-3">
                        <Button onClick={() => { onBackClick() }} className="bg-button" variant="dark">Back</Button>
                    </Col>
                </Row>
            </Col>

            {/* This is the info colums containing nested columns for genre, director and cast */}
            <Col md={8} className="right-column p-3">
                <p>{movieData.Description}</p>
                <hr className="solid" />
                <Row>
                    <Col sm={4} md={4}>
                        <div className="font-weight-bold">Director</div>
                        <DirectorView movieData={movieData} />


                    </Col>

                    <Col sm={4} md={4}>
                        <div className="categories">Genre</div>
                        <GenreView movieData={movieData} />
                    </Col>

                    {/* ToDo: Adding a cast list to data in MongoDB */}
                    <Col sm={4} md={4}>
                        <div className="categories">Cast</div>
                        <ul className="mt-2">
                            {movieData.Actors.map(actor => <li key={actor}>{actor}</li>)}
                        </ul>
                    </Col>
                </Row>
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

export default connect(mapStateToProps, { ToggleFavorites })(MovieView)