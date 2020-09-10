/// <reference types="react" />
//import React from "react";

class Light extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <span className="u-hiddenVisually">
          {this.props.color} light {this.props.label} is{" "}
          {this.props.value ? "on" : "off"}.
        </span>
        <wokwi-led
          aria-hidden="true"
          value={this.props.value ? "1" : ""}
          label={this.props.label}
          color={this.props.color}
        ></wokwi-led>
      </div>
    );
  }
}

export default Light;
