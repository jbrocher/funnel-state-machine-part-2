import React from "react";
import FunnelProvider from "./acquisition-funnel/FunnelProvider";
import StateRenderer from "./acquisition-funnel/StateRenderer";
import ActivityStep from "./acquisition-funnel/steps/ActivityStep";
import AttendeeStep from "./acquisition-funnel/steps/AttendeeStep";
import AdditionnalInformationStep from "./acquisition-funnel/steps/AdditionalInfomationStep";
import { stateMachine } from "./acquisition-funnel/state-machine";
import {
  SELECT_ACTIVITY,
  SUBMIT_ADDITIONNAL_INFORMATION,
} from "./acquisition-funnel/types";
import "./App.css";

function App() {
  return (
    <div className="App">
      <FunnelProvider stateMachine={stateMachine}>
        <StateRenderer state="activity">
          {(send) => (
            <ActivityStep
              onSubmit={(activity) => {
                send({
                  type: SELECT_ACTIVITY,
                  data: activity,
                });
              }}
            />
          )}
        </StateRenderer>
        <StateRenderer state="register_attendee">
          {(send) => (
            <AttendeeStep
              addAttendee={(attendee) =>
                send({ type: "ADD_ATTENDEE", data: attendee })
              }
              addInfo={(attendee) => send({ type: "ADD_INFO", data: attendee })}
              proceedToPayment={(attendee) =>
                send({ type: "SUBMIT_ATTENDEE", data: attendee })
              }
            />
          )}
        </StateRenderer>
        <StateRenderer state="additional_information">
          {(send) => (
            <AdditionnalInformationStep
              onSubmit={(info) =>
                send({
                  type: SUBMIT_ADDITIONNAL_INFORMATION,
                  data: info,
                })
              }
            />
          )}
        </StateRenderer>
        <StateRenderer state="payment">
          {() => {
            return <h2>payment</h2>;
          }}
        </StateRenderer>
      </FunnelProvider>
    </div>
  );
}

export default App;
