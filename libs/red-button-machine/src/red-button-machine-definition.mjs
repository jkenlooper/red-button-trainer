import { assign } from "../node_modules/@xstate/fsm/es/index.js";

const state = Object.freeze({
  up: "up",
  ready: "ready",
  down: "down",
});

const action = Object.freeze({
  randomStart: "randomStart",
  updateButton: "updateButton",
  sendError: "sendError",
  setLights: "setLights",
  startTimer: "startTimer",
  stopTimer: "stopTimer",
});

const event = Object.freeze({
  ButtonClicked: "ButtonClicked",
  Reset: "Reset",
  Start: "Start",
});

const context = Object.freeze({
  id: undefined,
  responseTime: undefined,
  lights: [undefined, undefined],
});

const stateDefinitions = {};

stateDefinitions[state.up] = {
  entry: [
    assign(Object.assign({}, context)),
    action.updateButton,
    action.randomStart,
  ],
  on: {},
};

stateDefinitions[state.up].on[event.ButtonClicked] = [
  {
    target: state.down,
    actions: [
      assign({
        responseTime: (context, event) => {
          return -1;
        },
      }),
      action.setLights,
      action.updateButton,
      action.sendError,
    ],
  },
];
stateDefinitions[state.up].on[event.Start] = [
  {
    target: state.ready,
    actions: [
      assign({
        lights: (context, event) => {
          return [false, true];
        },
        _start: (context, event) => {
          return Date.now();
        },
      }),
      action.setLights,
      action.startTimer,
    ],
  },
];

stateDefinitions[state.down] = {
  entry: [
    assign({
      lights: (context, event) => {
        return [true, false];
      },
    }),
  ],
  on: {},
};

stateDefinitions[state.down].on[event.Reset] = [
  {
    target: state.up,
    actions: [],
  },
];

stateDefinitions[state.ready] = {
  on: {},
};
stateDefinitions[state.ready].on[event.ButtonClicked] = [
  {
    target: state.down,
    actions: [
      assign({
        responseTime: (context, event) => {
          const now = Date.now();
          return (now - context._start) / 1000;
        },
      }),
      action.stopTimer,
      action.updateButton,
    ],
  },
];

const redButtonMachineDefinition = {
  id: "red-button",
  initial: state.up,
  context: Object.assign({}, context),
  states: stateDefinitions,
};

export { redButtonMachineDefinition, state, action, event };
