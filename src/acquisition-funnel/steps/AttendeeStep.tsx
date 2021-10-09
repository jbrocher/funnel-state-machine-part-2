import React from "react";
import { Attendee } from "../types";
import { Field, ErrorMessage, Formik } from "formik";

interface AttendeeStepProps {
  addAttendee: (attendee: Attendee) => void;
  proceedToPayment: (attendee: Attendee) => void;
  addInfo: (attendee: Attendee) => void;
}

const AttendeeStep: React.FunctionComponent<AttendeeStepProps> = ({
  addAttendee,
  proceedToPayment,
  addInfo,
}) => {
  return (
    <Formik
      onSubmit={(values) => {
        proceedToPayment(values);
      }}
      initialValues={{
        name: "",
        surname: "",
      }}
    >
      {({ values }) => (
        <div>
          <h2>Pick an activity </h2>
          <ErrorMessage name="activity" />
          <label>
            <Field name="name" />
            Name
          </label>
          <label>
            <Field name="surname" />
            Surname
          </label>
          <div>
            <button
              onClick={() => {
                addAttendee(values);
              }}
            >
              Submit and add another
            </button>
            <button
              onClick={() => {
                proceedToPayment(values);
              }}
            >
              Proceed to payment
            </button>
            <button
              onClick={() => {
                addInfo(values);
              }}
            >
              Enter additional information
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AttendeeStep;
