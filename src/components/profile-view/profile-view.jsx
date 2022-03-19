import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./profile-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  // Current User profile data

  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://my-film-flix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Edit current User profile

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://my-film-flix.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile updated.");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Delete A Favorite Movie From Users Favorite

  onRemoveFavorite(movieId) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://my-film-flix.herokuapp.com/users/${username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Movie successfully removed from Favorites");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Delete A User

  onDeleteUser() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    axios
      .delete(`https://my-film-flix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { onBackClick, movies, user } = this.props;

    const FavoriteMovies = movies.filter((m) => {
      return this.state.FavoriteMovies.includes(m._id);
    });

    return (
      <Container md={8} className="profile-view">
        <Container className="d-flex flex-row justify-content-end align-items-baseline">
          <div className="mr-2">
            <p>
              Signed in as{" "}
              <span>
                {" "}
                <Link to={`/users/${user}`}>{this.state.Username}</Link>{" "}
              </span>{" "}
            </p>
          </div>
          <Button
            variant="danger"
            onClick={() => {
              this.onLoggedOut();
            }}
          >
            Log out
          </Button>
          <Button
            className="backProfileButton"
            variant="secondary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Container>

        <div className="profileInformation">
          <div className="profileContent">
            <h4>MY PROFILE</h4>
          </div>
          <div className="profileContent">
            <h6>USERNAME</h6>
            <div>
              <p>{this.state.Username}</p>
            </div>
          </div>
          <div className="profileContent">
            <h6>EMAIL</h6>
            <div>
              <p>{this.state.Email}</p>
            </div>
          </div>
          <div className="profileContent">
            <h6>BIRTHDAY</h6>
            <div>
              <p>{new Date(this.state.Birthday).toLocaleDateString("en-US")}</p>
            </div>
          </div>
          <div>
            <h4>EDIT PROFILE</h4>
          </div>
          <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
            <Form.Group>
              Username
              <Form.Control
                type="text"
                name="Username"
                placeholder="New Username"
                onChange={(e) => this.setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              Password
              <Form.Control
                type="password"
                name="Password"
                placeholder="New Password"
                onChange={(e) => this.setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              Email Address
              <Form.Control
                type="email"
                name="Email"
                placeholder="New Email"
                onChange={(e) => this.setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              Birthday
              <Form.Control
                type="date"
                name="Birthday"
                onChange={(e) => this.setBirthday(e.target.value)}
              />
            </Form.Group>
            <span className="marginSpacer">
              <Button variant="success" type="submit">
                Update
              </Button>
            </span>
            <span className="marginSpacer">
              <Button variant="danger" onClick={() => this.onDeleteUser()}>
                Delete Profile
              </Button>
            </span>
          </Form>
        </div>

        <div className="favoriteMoviesView">
          <h3>Favorite Movies</h3>
          <div className="responsiveMovieWrapper">
            {FavoriteMovies.map((movie) => (
              <Row className="xs={1} md={2} flex-wrap" key={movie._id}>
                <Col className="flex-column">
                  {/*  <div className="d-flex FavoriteMovies align-items-center favoriteListMovies"> */}
                  <MovieCard movie={movie} />
                  <Button
                    className="unfavoriteMovieButton"
                    variant="danger"
                    onClick={() => {
                      this.onRemoveFavorite(movie._id);
                    }}
                  >
                    Remove Favorite
                  </Button>
                </Col>

                {/*  </div> */}
              </Row>
            ))}
          </div>
        </div>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};
