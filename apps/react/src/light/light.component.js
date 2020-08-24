/// <reference types="react" />
//import React from "react";

import "light-css";

class Light extends React.Component {
  constructor(props) {
    super(props);
    this.cssVariants = {
      red: "Light--red",
      green: "Light--green",
    };
  }
  render() {
    const lightClassName = `Light ${this.cssVariants[this.props.color]} ${
      this.props.value && "is-active"
    }`;
    return (
      <div className={lightClassName}>
        <span className="u-hiddenVisually">
          {this.props.color} light is {this.props.value ? "on" : "off"}.
        </span>
      </div>
    );
  }
}

export default Light;
