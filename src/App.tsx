import React from "react";
import FunnelProvider from "./acquisition-funnel/FunnelProvider";
import StateRenderer from "./acquisition-funnel/StateRenderer";
import RegistrationStep from "./acquisition-funnel/RegistrationStep";
import { stateMachine } from "./acquisition-funnel/state-machine";
import "./App.css";

function App() {
  return (
    <div className="App">
      <FunnelProvider stateMachine={stateMachine}>
        <StateRenderer state="activity">
          {(send) => {
            return (
              <div>
                <h2>Activity Step</h2>
                <button onClick={() => send("NEXT")}>next</button>
              </div>
            );
          }}
        </StateRenderer>
        <StateRenderer state="register_participant">
          {(send) => (
            <RegistrationStep
              add_participant={() => send("ADD_PARTICIPANT")}
              additional_information={() => send("ADD_INFO")}
              proceed_to_payment={() => send("NEXT")}
            />
          )}
        </StateRenderer>
        <StateRenderer state="additional_information">
          {(send) => {
            return (
              <div>
                <h2>Additional information</h2>
                <button onClick={() => send("NEXT")}>next</button>
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
