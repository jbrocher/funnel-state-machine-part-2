import React from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";

interface AdditionalInformationStepProps {
  onSubmit: (activity: string) => void;
}

interface FormValues {
  additionalInformation: string;
}

const AdditionalInformationStep: React.FunctionComponent<AdditionalInformationStepProps> =
  ({ onSubmit }) => {
    return (
      <Formik
        onSubmit={(values: FormValues) =>
          onSubmit(values.additionalInformation)
        }
        initialValues={{ additionalInformation: "" }}
      >
        <Form>
          <h2>Enter additional information</h2>
          <ErrorMessage name="additionalInformation" />
          <label>
            <Field name="additionalInformation" />
          </label>
          <button type="submit"> Proceed to Payment </button>
        </Form>
      </Formik>
    );
  };

export default AdditionalInformationStep;
