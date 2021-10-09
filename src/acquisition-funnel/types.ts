export const ESCAPE_GAME = "escape-game";
export const BOWLING = "bowling";

export interface Attendee {
  name: string;
  surname: string;
}

export type Activity = typeof ESCAPE_GAME | typeof BOWLING;

export interface FunnelData {
  activity?: Activity;
  attendees: Attendee[];
  additional_information?: string;
  payment?: number;
}

export const SELECT_ACTIVITY = "SELECT_ACTIVITY";
export const SUBMIT_ATTENDEE = "SUBMIT_ATTENDEE";
export const ADD_ATTENDEE = "ADD_ATTENDEE";
export const ADD_INFO = "ADD_INFO";
export const SUBMIT_ADDITIONNAL_INFORMATION = "SUBMIT_ADDITIONNAL_INFORMATION";
