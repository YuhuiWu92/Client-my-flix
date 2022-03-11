import React, { Component } from "react";

export class GenreView extends Component {
  render() {
    return (
      <div>
        GenreView
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
      </div>
    );
  }
}
