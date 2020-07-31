import { createMachine } from "@xstate/fsm";
import { redButtonMachineDefinition } from "./red-button-machine-definition.mjs";
export {
  redButtonMachineDefinition,
  event,
} from "./red-button-machine-definition.mjs";

export const redButtonMachine = createMachine(redButtonMachineDefinition);
