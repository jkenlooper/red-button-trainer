/// <reference types="react" />
/// <reference types="react-dom" />

import "suitcss-utils-display";

import RedButtonTrainer from "./red-button-trainer/index.js";

class App extends React.Component {
  render() {
    return <RedButtonTrainer></RedButtonTrainer>;
  }
}

let domContainer = document.querySelector("#red-button-trainer-app");
ReactDOM.render(<App />, domContainer);
