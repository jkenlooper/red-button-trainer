/// <reference types="react" />
//import React from "react";

import "reset-css";

class Reset extends React.Component {
  render() {
    return (
      <div className="Reset">
        <button
          type="button"
          disabled={this.props.disabled}
          className="Reset-button"
          onClick={() => this.props.onClick()}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default Reset;
