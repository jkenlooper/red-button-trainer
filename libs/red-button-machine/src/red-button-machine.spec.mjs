import {
  redButtonMachine,
  redButtonMachineDefinition,
  state,
  action,
  event,
} from "./index.js";

const machine = redButtonMachine;

suite("Button states", () => {
  test("Initial", () => {
    chai.assert.equal(machine.initialState.value, state.up);
  });
  test("ButtonClicked when state is up", () => {
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
