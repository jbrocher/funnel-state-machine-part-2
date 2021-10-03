import React, { useState } from "react";

interface RegistrationProps {
  add_participant: () => void;
  additional_information: () => void;
  proceed_to_payment: () => void;
}
const RegistrationStep: React.FunctionComponent<RegistrationProps> = ({
  add_participant,
  additional_information,
  proceed_to_payment,
}) => {
  const [counter, setCounter] = useState(1);

  return (
    <div>
      <h2>Register participant number {counter}</h2>
      <button
        onClick={() => {
          setCounter((counter) => counter + 1);
          add_participant();
        }}
      >
        Continue registering
      </button>
      <button onClick={additional_information}>
        Add additional information
      </button>
      <button onClick={proceed_to_payment}>Proceed to Payment</button>
    </div>
  );
};

export default RegistrationStep;
