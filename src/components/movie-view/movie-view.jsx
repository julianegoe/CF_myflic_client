import React from "react";

export class MovieView extends React.Component {
    render() {
        const { movieData, goBack } = this.props;
        return <div className="movie-view">
            <h1 className="movie-title">{movieData.Title}</h1>
            <span className="movie-year">{movieData.Year}</span>
            <span className="movie-director">{" Directed by " + movieData.Director}</span>
            <div className="movie-section">
                <img className="movie-poster" src={movieData.ImagePath} alt="movie poster" />
                <div className="movie-description">{movieData.Description}</div>
            </div>
            <button className="back-button" onClick={() => { goBack(null) }}>Back</button>

        </div >
    }
}