import mocha from "mocha";
import chai from "chai";

import redButtonMachine from "./red-button-machine.js";
import { state, action, event } from "./red-button-machine-definition.js";

const machine = redButtonMachine;

mocha.suite("Initial suite", () => {
  mocha.test("something", () => {
    chai.assert.equal(machine.initialState.value, state.up);
    let nextState = machine.transition(machine.initialState.value, {
      type: event.ButtonClicked,
      payload: {
        id: 1,
      },
    });
    chai.assert.equal(nextState.value, state.down);
  });
});
