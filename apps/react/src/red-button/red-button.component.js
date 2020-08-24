/// <reference types="react" />
//import React from "react";

import "red-button-css";

class RedButton extends React.Component {
  render() {
    return (
      <div className="RedButton">
        <button
          type="button"
          id="red-button"
          disabled={this.props.disabled}
          className="RedButton-button"
          onClick={() => this.props.onClick()}
        >
          {this.props.label}
        </button>
      </div>
    );
  }
}

export default RedButton;
