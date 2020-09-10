import { assign } from "../dist/xstate-fsm-es.js";

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

stateDefinitions[state.down].on[event.ButtonClicked] = [
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
          /* Return a rounded time that will fit in 4 characters (not counting
           * the decimal point). This is so the 7 segment component will be able
           * to show the value.
           */
          const now = context._now || Date.now();
          const actual = Math.min(9999, (now - context._start) / 1000);
          const wholeSeconds = actual - (actual % 1);
          const zeroPaddedFraction =
            ((actual % 1).toString() + ".0").split(".")[1] + "000";
          const rounded = `${wholeSeconds.toString()}.${zeroPaddedFraction}`.slice(
            0,
            actual > 1000 ? 4 : 5
          );
          return rounded;
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
