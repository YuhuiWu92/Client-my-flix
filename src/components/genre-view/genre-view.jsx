import React, { Component } from "react";
import { Link } from "react-router-dom";

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
          <button variant="outline-light" onClick={() => onBackClick()}>
            Back
          </button>
        </div>
      </>
    );
  }
}
