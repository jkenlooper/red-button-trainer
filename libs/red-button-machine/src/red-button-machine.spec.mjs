import mocha from "mocha";
import chai from "chai";

import {
  redButtonMachine,
  redButtonMachineDefinition,
  state,
  action,
  event,
} from "../dist/red-button-machine.bundle.js";

const machine = redButtonMachine;

mocha.suite("Button states", () => {
  mocha.test("Initial", () => {
    chai.assert.equal(machine.initialState.value, state.up);
  });
  mocha.test("ButtonClicked when state is up", () => {
    let nextState = machine.transition(state.up, {
      type: event.ButtonClicked,
      /*
      payload: {
        id: 1,
      },
      */
    });
    chai.assert.equal(nextState.value, state.down);
  });
});
