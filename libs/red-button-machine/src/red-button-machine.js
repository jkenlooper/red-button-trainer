import { createMachine } from "@xstate/fsm";
import { redButtonMachineDefinition } from "./red-button-machine-definition.js";
export {
  redButtonMachineDefinition,
  event,
} from "./red-button-machine-definition.js";

export const redButtonMachine = createMachine(redButtonMachineDefinition);
