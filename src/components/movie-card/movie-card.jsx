import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // line 6 => const movieData = this.props.movieData
    const { movie,onMovieClick } = this.props;
    return <div className="movie-card" 
    onClick={() => { onMovieClick(movie);}}
    > {movie.Title}</div>;
  }
}