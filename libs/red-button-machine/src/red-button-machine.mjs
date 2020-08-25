import {
  createMachine,
  interpret,
} from "../node_modules/@xstate/fsm/es/index.js";

import { redButtonMachineDefinition } from "./red-button-machine-definition.mjs";

export const redButtonMachine = createMachine(redButtonMachineDefinition);

export function redButtonFactory() {
  return interpret(redButtonMachine);
}

export function getRandomTimeout() {
  const startDelay = 3 * 1000;
  const maxTimeout = 7 * 1000;
  const randomDelay = Math.round(startDelay + Math.random() * maxTimeout);
  // TODO: how to cancel a promise?
  let timeout;
  return new Promise((resolve, reject) => {
    timeout = window.setTimeout(() => {
      resolve();
    }, randomDelay);
  });
}
