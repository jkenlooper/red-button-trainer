'use strict';

//const React = require('react');
//const ReactDOM = require('react-dom');


class RedButton extends React.Component {

  render() {
    return (
      <div>
        <button onClick={() => this.props.onClick() }>
          {this.props.label}
        </button>
        {this.props.value}
      </div>
    );
  }
}

function buttonTransition(state) {
  let newState;
  switch (state.button) {
    case "UP":
      newState = "DOWN";
    break;
    case "DOWN":
      newState = "UP";
    break;
    default:
      break;
  }
  return newState;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {button:"UP"};
  }

  handleClick() {
    this.setState({button:buttonTransition(this.state)});
  }

  render() {
    return (
      <RedButton label="Eject"
        value={this.state.button}
        onClick={() => this.handleClick() }/>
    );
  }
}

let domContainer = document.querySelector('#red-button-trainer-app');
ReactDOM.render(<App />, domContainer);



