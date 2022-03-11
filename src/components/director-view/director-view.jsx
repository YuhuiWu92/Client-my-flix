import React, { Component } from "react";

export class DirectorView extends Component {
  render() {
    return (
      <div>
        director-view
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        ;
      </div>
    );
  }
}
