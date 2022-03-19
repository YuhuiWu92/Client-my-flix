import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export class GenreView extends Component {
  render() {
    const { Name, Description } = this.props.genre;
    const { onBackClick } = this.props;
    console.dir(this.props);
    return (
      <>
        <div>
          <h2> {Name}</h2>
          <p>{Description}</p>
          <Button variant="outline-secondary" onClick={() => onBackClick()}>
            Back
          </Button>
        </div>
      </>
    );
  }
}
