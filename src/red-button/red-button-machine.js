import { createMachine } from "@xstate/fsm";
import { redButtonMachineDefinition } from "./red-button-machine-definition.js";

const redButtonMachine = createMachine(redButtonMachineDefinition);
export default redButtonMachine;
