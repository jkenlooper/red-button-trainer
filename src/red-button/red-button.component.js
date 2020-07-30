/// <reference types="react" />
//import React from "react";

class RedButton extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.onClick()}>{this.props.label}</button>
        {this.props.value}
      </div>
    );
  }
}

export default RedButton;
