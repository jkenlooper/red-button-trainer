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
  });

  test("When state is ready; transition to down.", function () {
    let nextState = machine.transition(state.ready, event.ButtonClicked);
    chai.assert.equal(nextState.value, state.down);
    chai.assert.deepEqual(nextState.actions, [
      { type: action.stopTimer },
      { type: action.updateButton },
    ]);
  });

  test("When state is down; transition to down.", function () {
    let nextState = machine.transition(state.down, event.ButtonClicked);
    chai.assert.equal(nextState.value, state.down);
    chai.assert.deepEqual(nextState.actions, []);
  });
});

suite("Event Reset", function () {
  test("When state is up; transition to up.", function () {
    let nextState = machine.transition(state.up, event.Reset);
    chai.assert.equal(nextState.value, state.up);
    chai.assert.deepEqual(nextState.actions, []);
  });

  test("When state is ready; transition to ready.", function () {
    let nextState = machine.transition(state.ready, event.Reset);
    chai.assert.equal(nextState.value, state.ready);
    chai.assert.deepEqual(nextState.actions, []);
  });

  test("When state is down; transition to up.", function () {
    let nextState = machine.transition(state.down, event.Reset);
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
