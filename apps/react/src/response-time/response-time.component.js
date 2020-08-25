/// <reference types="react" />
//import React from "react";

import "response-time-css";

class ResponseTime extends React.Component {
  render() {
    const status = (() => {
      if (this.props.value === undefined) {
        return "waiting";
      }
      if (this.props.value === -1) {
        return "error";
      }
      return "done";
    })();
    const outputContent = (() => {
      let el;
      switch (status) {
        case "waiting":
          el = (
            <span className="u-block">
              --
              <br />
              &nbsp;
            </span>
          );
          break;
        case "error":
          el = (
            <span className="u-block">
              --
              <br />
              Fail
            </span>
          );
          break;
        case "done":
          el = (
            <time class="u-block" datetime="PT1.92S">
              {this.props.value}
              <br />
              Seconds
            </time>
          );
          break;
        default:
          el = "";
      }
      return el;
    })();
    return (
      <div className="ResponseTime">
        <output
          name="response-time"
          for="red-button"
          className="ResponseTime-output"
        >
          {outputContent}
        </output>
      </div>
    );
  }
}

export default ResponseTime;
