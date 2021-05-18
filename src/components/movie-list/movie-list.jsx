import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../movie-card/movie-card';
import { Col, Row, Container } from 'react-bootstrap';
import VisibilityFilterInput from '../visibility-filter-input-component/visibility-filter-input-component'



const mapStateTopProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter }
}

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter != '') {
        filteredMovies = movies.filter((movie) => {
            return movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
        })
    }


    if (!movies) { return (<div className="main-view">Empty</div>) }


    return <>
        <Container fluid className="m-3 p-0">
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Container>
        {
            filteredMovies.map(movie =>
            (
                <Col xs={12} sm={6} md={4} lg={2} className="p-3" key={movie._id}>
                    <MovieCard movieData={movie} />
                </Col>
            )
            )
        }
    </>


};

export default connect(mapStateTopProps)(MoviesList)