import { Machine, assign } from "xstate";

type ESCAPE_GAME = "escape-game";
type BOWLING = "bowling";

interface Attendee {
  name: string;
  surname: string;
}

type Activity = ESCAPE_GAME | BOWLING;

interface FunnelData {
  activity?: ESCAPE_GAME | BOWLING;
  attendees: Attendee[];
  additional_information?: string;
  payment?: number;
}

const SELECT_ACTIVITY = "SELECT_ACTIVITY";
const SUBMIT_ATTENDEE = "SUBMIT_ATTENDEE";
const ADD_ATTENDEE = "ADD_ATTENDEE";
const ADD_INFO = "ADD_INFO";
const SUBMIT_ADDITIONNAL_INFORMATION = "SUBMIT_ADDITIONNAL_INFORMATION";

type AttendeeEvent = {
  type: typeof SUBMIT_ATTENDEE | typeof ADD_ATTENDEE | typeof ADD_INFO;
  data: Attendee;
};
type ActivityEvent = {
  type: typeof SELECT_ACTIVITY;
  data: Activity;
};
type AdditionalInformationEvent = {
  type: typeof SUBMIT_ADDITIONNAL_INFORMATION;
  data: string;
};

type FunnelEvent = AttendeeEvent | ActivityEvent | AdditionalInformationEvent;

const setActvity = (context: FunnelData, event: FunnelEvent) => {
  if (event.type !== SELECT_ACTIVITY) {
    return context;
  }
  return {
    ...context,
    activity: event.data,
  };
};

const addAttendee = (context: FunnelData, event: FunnelEvent) => {
  switch (event.type) {
    case ADD_ATTENDEE:
      return {
        context,
        attendees: context.attendees.concat(event.data),
      };
    case SUBMIT_ATTENDEE:
      return {
        context,
        attendees: context.attendees.concat(event.data),
      };
    case ADD_INFO:
      return {
        context,
        attendees: context.attendees.concat(event.data),
      };
    default:
      return context;
  }
};

const setAddtionnalInformation = (context: FunnelData, event: FunnelEvent) => {
  if (event.type !== SUBMIT_ADDITIONNAL_INFORMATION) {
    return context;
  }
  return {
    ...context,
    additionnal_information: event.data,
  };
};

export const stateMachine = Machine<FunnelData, FunnelEvent>(
  {
    id: "funnel-state-machine",
    initial: "activity",
    context: {
      activity: undefined,
      attendees: [],
      additional_information: undefined,
      payment: undefined,
    },
    states: {
      activity: {
        on: {
          SELECT_ACTIVITY: "register_attendee",
        },
        exit: ["setActivity"],
      },
      register_attendee: {
        on: {
          ADD_ATTENDEE: "register_attendee",
          ADD_INFO: "additional_information",
          SUBMIT_ATTENDEE: "payment",
        },
        exit: ["addattendee"],
      },
      additional_information: {
        on: {
          SUBMIT_ADDITIONNAL_INFORMATION: "payment",
        },
        exit: ["setAdditionnalInformation"],
      },
      payment: {
        type: "final",
      },
    },
  },
  {
    actions: {
      setActivity: assign(setActvity),
      addattendee: assign(addAttendee),
      setAddtionnalInformation: assign(setAddtionnalInformation),
    },
  }
);

export default stateMachine;
