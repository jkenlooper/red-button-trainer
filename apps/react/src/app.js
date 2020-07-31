/// <reference types="react" />
/// <reference types="react-dom" />

import { redButtonMachine, event } from "red-button-machine";

import RedButton from "./red-button/index.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { button: redButtonMachine.initialState.value };
  }

  handleClick() {
    let nextState = redButtonMachine.transition(this.state.button, {
      type: event.ButtonClicked,
    });
    this.setState({ button: nextState.value });
  }

  render() {
    return (
      <RedButton
        label="Eject"
        value={this.state.button}
        onClick={() => this.handleClick()}
      />
    );
  }
}

let domContainer = document.querySelector("#red-button-trainer-app");
ReactDOM.render(<App />, domContainer);
