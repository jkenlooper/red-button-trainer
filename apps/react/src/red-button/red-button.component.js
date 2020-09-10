/// <reference types="react" />
//import React from "react";

class RedButton extends React.Component {
  render() {
    return (
      <div>
        <wokwi-pushbutton
          color="red"
          onClick={() => this.props.onClick()}
        ></wokwi-pushbutton>
      </div>
    );
  }
}

export default RedButton;
