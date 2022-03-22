import React from "react";
import { Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { setFilter } from "../../actions/actions";
function VisibilityFilterInput(props) {
  return (
    <FormControl
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="filter"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
