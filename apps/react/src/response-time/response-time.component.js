/// <reference types="react" />
//import React from "react";

import "response-time-css";
import { digitTo7Segment } from "digit-to-7segment";

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
      let values;
      switch (status) {
        case "waiting":
          values = [].concat(
            digitTo7Segment("-", true),
            digitTo7Segment("-", false),
            digitTo7Segment("-", false),
            digitTo7Segment("-", false)
          );
          el = (
            <wokwi-7segment
              digits={values.length / 8}
              color="yellow"
              pins="extend"
              offcolor="#222"
              values={JSON.stringify(values)}
            ></wokwi-7segment>
          );
          break;
        case "error":
          values = [].concat(
            digitTo7Segment("f"),
            digitTo7Segment("a"),
            digitTo7Segment("i"),
            digitTo7Segment("l")
          );
          el = (
            <wokwi-7segment
              digits={values.length / 8}
              color="yellow"
              pins="extend"
              offcolor="#222"
              values={JSON.stringify(values)}
            ></wokwi-7segment>
          );
          break;
        case "done":
          values = [].concat(
            ...this.props.value.split("").reduceRight(
              (acc, char) => {
                if (char === ".") {
                  acc.dec = true;
                  return acc;
                }
                acc.segments.unshift(digitTo7Segment(char, acc.dec));
                acc.dec = false;
                return acc;
              },
              { dec: false, segments: [] }
            ).segments
          );
          el = (
            <time class="u-block" datetime={`PT${this.props.value}S`}>
              <wokwi-7segment
                digits={values.length / 8}
                color="yellow"
                pins="extend"
                offcolor="#222"
                values={JSON.stringify(values)}
              ></wokwi-7segment>
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
