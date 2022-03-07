import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardGroup } from "react-bootstrap";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImageUrl} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button
            onClick={() => {
              onMovieClick(movie);
            }}
            variant="link"
          >
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

// use propTypes to catch errors
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    //ImageUrl: PropTypes.string.isRequired,
  }).isRequired,
  //onMovieClick: PropTypes.func.isRequired,
};
