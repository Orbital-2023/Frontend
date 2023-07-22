import React, { useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserContext } from "@/services/userContext";

interface EmailFormProps {
  apiUrl: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ apiUrl }) => {
  // Access the user context
  const userContext = useContext(UserContext);

  // Get roomId and roomPassword from the user context, if available
  const roomId = userContext.user?.roomId;
  const roomPassword = userContext.user?.roomPassword;

  // Define the function to handle form submission
  const handleSubmit = async (
    values: { email: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);

    // Prepare the payload to be sent in the API request
    const payload = {
      roomId: roomId?.toString(),
      roomPassword: roomPassword?.toString(),
      email: values.email.toString(),
    };
    console.log(payload);

    try {
      // Make a POST request to the specified API with the payload
      const response = await axios.post(apiUrl, payload);

      // Update the list of email to userContext
      const emailsArray = response.data.emails
        .split(",")
        .map((email: string) => email.trim());
      console.log(emailsArray);

      // Set the user context with the received data from the API response
      userContext.setUser({
        roomId: response.data.roomId,
        roomPassword: response.data.roomPassword,
        emails: emailsArray,
      });

      if (response.status === 200) {
        console.log("Request succeeded!");
      }
    } catch (error) {
      // Handle error here
      console.error(error);
    } finally {
      // Set submitting state to false after the request is completed
      setSubmitting(false);
    }
  };

  // Define the validation schema for the email field
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form style={{ marginTop: "20px" }}>
        {/* Formik's Field component to handle the email input */}
        <Field
          type="email"
          name="email"
          placeholder="Enter email address"
          // value={email}
          // onChange={(event: any) => setEmail(event.target.value)}
        />
        {/* Display error message if the email field is not valid */}
        <ErrorMessage name="email" component="div" />
        <button type="submit">Send Email</button>
      </Form>
    </Formik>
  );
};

export default EmailForm;
