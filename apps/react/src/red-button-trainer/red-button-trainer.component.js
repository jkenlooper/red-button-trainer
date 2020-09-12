import {
  redButtonMachine,
  redButtonFactory,
  getRandomTimeout,
  event,
  action,
  state,
} from "red-button-machine";

import "red-button-trainer-css";
import RedButton from "../red-button/index.js";
import Reset from "../reset/index.js";
import LightArray from "../light-array/index.js";
import ResponseTime from "../response-time/index.js";

class RedButtonTrainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: redButtonMachine.initialState.value,
      //actions: redButtonMachine.initialState.actions,
      context: redButtonMachine.initialState.context,
      /*
      id: undefined,
      responseTime: undefined,
      lights: [undefined, undefined],
      */
    };
    this.redButtonService = redButtonFactory();
    this.redButtonService.subscribe(this.handleStateChange.bind(this));
  }
  componentDidMount() {
    this.redButtonService.start();
  }
  componentWillUnmount() {
    this.redButtonService.stop();
  }

  handleStateChange(state) {
    state.actions.forEach((_action) => {
      switch (_action.type) {
        case action.randomStart:
          this.startRandomTimeout();
          break;
        case action.sendError:
          window.clearTimeout(this._startTimeout);
          break;
        case action.startTimer:
        case action.stopTimer:
        case action.setLights:
        case action.updateButton:
          //this.setState({ value: state.value, context: state.context });
          break;
        default:
          break;
      }
      this.setState({ value: state.value, context: state.context });
    });
  }

  startRandomTimeout() {
    //window.clearTimeout(this._startTimeout);
    //this._startTimeout = window.setTimeout(() => {
    //  this.redButtonService.send(event.START);
    //}, Math.round(3 * 1000 + Math.random() * (7 * 1000)));

    const randomTimeout = getRandomTimeout();
    randomTimeout.then(() => {
      this.redButtonService.send(event.START);
    });
  }

  handleEvent(eventType) {
    /*
    let nextState = redButtonMachine.transition(this.state.value, {
      type: eventType,
    });
    this.setState({ value: nextState.value });
    */
    this.redButtonService.send(eventType);
  }

  render() {
    return (
      <div className="RedButtonTrainer">
        <div className="RedButtonTrainer-display">
          <LightArray lights={this.state.context.lights}></LightArray>
        </div>

        <div className="RedButtonTrainer-output">
          <ResponseTime value={this.state.context.responseTime}></ResponseTime>
        </div>

        <div className="RedButtonTrainer-console">
          <RedButton onClick={() => this.handleEvent(event.BUTTON_CLICKED)} />
        </div>
      </div>
    );
  }
}

export default RedButtonTrainer;
