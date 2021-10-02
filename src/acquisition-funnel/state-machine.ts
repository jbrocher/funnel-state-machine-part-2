import { Machine } from "xstate";

type ESCAPE_GAME = "escape-game";
type BOWLING = "bowling";

interface Member {
  name: string;
  surname: string;
}

interface FunnelData {
  activity?: ESCAPE_GAME | BOWLING;
  members: Member[];
  additional_information?: string;
  payment?: number;
}

export const stateMachine = Machine<FunnelData>({
  id: "funnel-state-machine",
  initial: "activity",
  context: {
    activity: undefined,
    members: [],
    additional_information: undefined,
    payment: undefined,
  },
  states: {
    activity: {
      on: {
        NEXT: "register_participant",
      },
    },
    register_participant: {
      on: {
        ADD_PARTICIPANT: "register_participant",
        ADD_INFO: "additional_information",
        NEXT: "payment",
      },
    },
    additional_information: {
      on: {
        NEXT: "payment",
      },
    },
    payment: {
      type: "final",
    },
  },
});

export default stateMachine;
