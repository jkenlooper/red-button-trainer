import {
  redButtonMachine,
  redButtonMachineDefinition,
  state,
  action,
  event,
} from "./index.js";

const machine = redButtonMachine;

suite("Initial", function () {
  test("State is up and has default context.", function () {
    chai.assert.equal(machine.initialState.value, state.up);
    chai.assert.deepEqual(machine.initialState.context, {
      id: undefined,
      responseTime: undefined,
      lights: [undefined, undefined],
    });
    chai.assert.deepEqual(
      JSON.parse(JSON.stringify(machine.initialState.actions)),
      JSON.parse(
        JSON.stringify([
          {
            type: "xstate.assign",
            assignment: { lights: [undefined, undefined] },
          },
          { type: action.updateButton },
          { type: action.randomStart },
        ])
      )
    );
  });
});

suite("Event ButtonClicked", function () {
  test("When state is up; transition to down.", function () {
    let nextState = machine.transition(state.up, event.ButtonClicked);
    chai.assert.equal(nextState.value, state.down);
    chai.assert.deepEqual(nextState.actions, [
      { type: action.setLights },
      { type: action.updateButton },
      { type: action.sendError },
    ]);
    chai.assert.equal(nextState.context.responseTime, -1);
  });

  test("When state is ready; transition to down.", function () {
    let nextState = machine.transition(state.ready, event.ButtonClicked);
    chai.assert.equal(nextState.value, state.down);
    chai.assert.deepEqual(nextState.actions, [
      { type: action.stopTimer },
      { type: action.updateButton },
    ]);
  });

  test("Response time for 1.92 seconds is '1.919'", function () {
    const now = Date.now();
    machine.initialState.context._now = now;
    machine.initialState.context._start = now - 1920;
    let nextState = machine.transition(state.ready, event.ButtonClicked);
    chai.assert.equal(nextState.context.responseTime, "1.919");
  });
  test("Response time for 192.245 seconds is '192.2'", function () {
    const now = Date.now();
    machine.initialState.context._now = now;
    machine.initialState.context._start = now - 192245;
    let nextState = machine.transition(state.ready, event.ButtonClicked);
    chai.assert.equal(nextState.context.responseTime, "192.2");
  });
  test("Response time for 99 seconds is '99.00'", function () {
    const now = Date.now();
    machine.initialState.context._now = now;
    machine.initialState.context._start = now - 99000;
    let nextState = machine.transition(state.ready, event.ButtonClicked);
    chai.assert.equal(nextState.context.responseTime, "99.00");
  });
  test("Response time for 9999 seconds is '9999'", function () {
    const now = Date.now();
    machine.initialState.context._now = now;
    machine.initialState.context._start = now - 9999000;
    let nextState = machine.transition(state.ready, event.ButtonClicked);
    chai.assert.equal(nextState.context.responseTime, "9999");
  });
  test("Response time for 10000.234 seconds is '9999'", function () {
    const now = Date.now();
    machine.initialState.context._now = now;
    machine.initialState.context._start = now - 10000234;
    let nextState = machine.transition(state.ready, event.ButtonClicked);
    chai.assert.equal(nextState.context.responseTime, "9999");
  });

  test("When state is down; transition to up.", function () {
    let nextState = machine.transition(state.down, event.ButtonClicked);
    chai.assert.equal(nextState.value, state.up);
    chai.assert.deepEqual(nextState.actions, [
      { type: action.updateButton },
      { type: action.randomStart },
    ]);
  });
});

suite("Event Start", function () {
  test("When state is up; transition to ready.", function () {
    let nextState = machine.transition(state.up, event.Start);
    chai.assert.equal(nextState.value, state.ready);
    chai.assert.deepEqual(nextState.actions, [
      { type: action.setLights },
      { type: action.startTimer },
    ]);
  });

  test("When state is ready; transition to ready.", function () {
    let nextState = machine.transition(state.ready, event.Start);
    chai.assert.equal(nextState.value, state.ready);
    chai.assert.deepEqual(nextState.actions, []);
  });

  test("When state is down; transition to down.", function () {
    let nextState = machine.transition(state.down, event.Start);
    chai.assert.equal(nextState.value, state.down);
    chai.assert.deepEqual(nextState.actions, []);
  });
});
