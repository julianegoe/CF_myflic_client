import React from "react";
import ReactDom from "react-dom";

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: "Inception", Description: "lorem ipsum", ImagePath: "#" },
                { _id: 2, Title: "Young Adult", Description: "lorem ipsum", ImagePath: "#" },
                { _id: 3, Title: "Rope", Description: "lorem ipsum", ImagePath: "#" },
            ]
        };
    }

    render() {
        const movies = this.state.movies;
        if (movies.length === 0) {
            return <div className="main-view">The list is empty!</div>;
        } else {
            return (
                <div className="main-view">
                    {movies.map((movie) => {
                        return <div key={movie._id}>{movie.Title}</div>;
                    })}
                </div>
            );
        }
    }
}