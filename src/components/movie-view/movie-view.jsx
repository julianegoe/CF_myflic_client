import React from "react";

export class MovieView extends React.Component {
    render() {
        const { movieData } = this.props;
        return <div className="movie-view">
            <h1 className="movie-title">{movieData.Title}</h1>
            <div className="movie-poster">
                <img src={movieData.ImagePath} />
            </div>
            <div className="movie-description">{movieData.Description}</div>

        </div>
    }
}