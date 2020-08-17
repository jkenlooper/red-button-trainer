import { createMachine } from "../node_modules/@xstate/fsm/es/index.js";

import { redButtonMachineDefinition } from "./red-button-machine-definition.mjs";

export const redButtonMachine = createMachine(redButtonMachineDefinition);
