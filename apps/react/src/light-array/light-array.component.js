/// <reference types="react" />
//import React from "react";

import "light-array-css";
import Light from "../light/index.js";

class LightArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightBulbs: [
        {
          color: "red",
        },
        {
          color: "green",
        },
      ],
    };
  }
  render() {
    const lights = this.props.lights
      .reduce((acc, lightValue, index) => {
        const light = {
          value: lightValue,
          label: `l${index + 1}`,
          color: this.state.lightBulbs[index].color,
        };
        acc.push(light);
        return acc;
      }, [])
      .map((light) => {
        return (
          <li className="LightArray-listItem">
            <Light
              label={light.label}
              value={light.value}
              color={light.color}
            ></Light>
          </li>
        );
      });

    return (
      <div className="LightArray">
        <ul className="LightArray-list" aria-live="polite">
          {lights}
        </ul>
      </div>
    );
  }
}

export default LightArray;
