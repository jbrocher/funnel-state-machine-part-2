import React from "react";
import { Activity, ESCAPE_GAME, BOWLING } from "../types";
import { Form, Field, ErrorMessage, Formik } from "formik";

interface ActivityStepProps {
  onSubmit: (activity: Activity | "") => void;
}

interface FormValues {
  activity: Activity | "";
}

const ActivityStep: React.FunctionComponent<ActivityStepProps> = ({
  onSubmit,
}) => {
  return (
    <Formik
      onSubmit={(values: FormValues) => onSubmit(values.activity)}
      initialValues={{ activity: "" }}
    >
      <Form>
        <h2>Pick an activity </h2>
        <ErrorMessage name="activity" />
        <label>
          <Field name="activity" type="radio" value={ESCAPE_GAME} />
          Escape Game
        </label>
        <label>
          <Field name="activity" type="radio" value={BOWLING} />
          Bowling
        </label>
        <button type="submit"> Next </button>
      </Form>
    </Formik>
  );
};

export default ActivityStep;
