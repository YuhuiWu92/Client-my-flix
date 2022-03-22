import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss";
import axios from "axios";

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    FavoriteMovies: [];
  }
  // uncommen this to check the key presses
  keypressCallback(event) {
    console.log(event.key);
  }

  componentWillUnmount() {
    //document.removeEventListener("keypress", this.keypressCallback);
    //console.log("!", users.FavoriteMovies);
  }

  handleAddToFav() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const movie = this.props.movie;

    axios
      .post(
        `https://my-film-flix.herokuapp.com/users/${username}/movies/${movie._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((r) => {
        alert(`${movie.Title} is successfully added to your Favorite list`);
      })
      .catch((e) => {
        console.log("Error while adding movie to favorite", e);
        alert("Something went wrong!");
      });
  }

  render() {
    const { movie, onBackClick, addFav } = this.props;

    return (
      <Container fluid className="moviesContainer">
        <Row>
          <Col>
            <div className="movie-poster">
              <img src={movie.ImagePath} />
            </div>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Genre: </span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </div>
            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </div>
            <Button variant="outline-secondary" onClick={() => onBackClick()}>
              Back
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => this.handleAddToFav()}
            >
              Add to Favorite
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
