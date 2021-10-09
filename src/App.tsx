import React from "react";
import FunnelProvider from "./acquisition-funnel/FunnelProvider";
import StateRenderer from "./acquisition-funnel/StateRenderer";
import ActivityStep from "./acquisition-funnel/steps/ActivityStep";
import AttendeeStep from "./acquisition-funnel/steps/AttendeeStep";
import { stateMachine } from "./acquisition-funnel/state-machine";
import { SELECT_ACTIVITY } from "./acquisition-funnel/types";
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
          {(send) => {
            return (
              <div>
                <h2>Additional information</h2>
                <button onClick={() => send("SUBMIT_ADDITIONNAL_INFORMATION")}>
                  next
                </button>
              </div>
            );
          }}
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
