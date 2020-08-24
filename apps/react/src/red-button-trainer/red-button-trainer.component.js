import { redButtonMachine, event, state } from "red-button-machine";

import RedButton from "../red-button/index.js";
import Reset from "../reset/index.js";
import LightArray from "../light-array/index.js";

class RedButtonTrainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: redButtonMachine.initialState.value,
      actions: [],
      context: redButtonMachine.initialState.context,
      /*
      id: undefined,
      responseTime: undefined,
      lights: [undefined, undefined],
      */
    };
  }

  handleEvent(eventType) {
    let nextState = redButtonMachine.transition(this.state.value, {
      type: eventType,
    });
    this.setState({ value: nextState.value });
  }

  render() {
    return (
      <div className="RedButtonTrainer">
        <div className="RedButtonTrainer-display">
          <LightArray lights={this.state.context.lights}></LightArray>
        </div>

        <div className="RedButtonTrainer-output"></div>

        <div className="RedButtonTrainer-console">
          <RedButton
            label="Halt"
            disabled={this.state.value === state.down}
            onClick={() => this.handleEvent(event.ButtonClicked)}
          />

          <Reset
            disabled={this.state.value !== state.down}
            onClick={() => this.handleEvent(event.Reset)}
          ></Reset>
        </div>
      </div>
    );
  }
}

export default RedButtonTrainer;
