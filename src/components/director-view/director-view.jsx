import React, { Component } from "react";
import { Link } from "react-router-dom";

export class DirectorView extends Component {
  render() {
    const { Name, Bio, Birthday } = this.props.director;
    const { onBackClick } = this.props;

    //console.dir(this.props);
    return (
      <>
        <h2>{Name}</h2>
        <p>{Bio}</p>
        <p>{new Date(Birthday).toLocaleDateString("en-US")}</p>
        <button variant="outline-light" onClick={() => onBackClick()}>
          Back
        </button>
      </>
    );
  }
}
