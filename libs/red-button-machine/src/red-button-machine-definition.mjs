import { assign } from "@xstate/fsm";

const state = Object.freeze({
  up: "up",
  down: "down",
});

const action = Object.freeze({
  updateButton: "updateButton",
});

const event = Object.freeze({
  ButtonClicked: "ButtonClicked",
});

const context = Object.freeze({
  id: undefined,
});

const stateDefinitions = {};

stateDefinitions[state.up] = {
  entry: [assign(Object.assign({}, context))],
  on: {},
};

stateDefinitions[state.up].on[event.ButtonClicked] = [
  {
    target: state.down,
    actions: [action.updateButton],
  },
];

stateDefinitions[state.down] = {
  //entry: [assign(Object.assign({}, context))],
  on: {},
};

stateDefinitions[state.down].on[event.ButtonClicked] = [
  {
    target: state.up,
    actions: [action.updateButton],
  },
];

const redButtonMachineDefinition = {
  id: "red-button",
  initial: state.up,
  context: Object.assign({}, context),
  states: stateDefinitions,
};

export { redButtonMachineDefinition, state, action, event };
