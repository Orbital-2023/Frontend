import React, { useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserContext } from "@/services/userContext";

interface EmailFormProps {
  apiUrl: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ apiUrl }) => {
  const userContext = useContext(UserContext);
  const roomId = userContext.user?.roomId;
  const roomPassword = userContext.user?.roomPassword;
  // console.log(userContext.user?.roomId);
  // console.log(userContext.user?.roomPassword);

  const handleSubmit = async(
    values: { email: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    const payload = {
      roomId: roomId?.toString(),
      roomPassword: roomPassword?.toString(),
      email: values.email.toString(),
    };
    console.log(payload)

    try {
      const response = await axios.post(apiUrl, payload);
      // console.log(response.data);

      // update the list of email to userContext
      const emailsArray = response.data.emails
        .split(",")
        .map((email: string) => email.trim());
      console.log(emailsArray);
      userContext.setUser({
        roomId: response.data.roomId,
        roomPassword: response.data.roomPassword,
        emails: emailsArray,
      });
      
      if (response.status == 200) {
        console.log("Request succeeded!");
      }
    } catch (error) {
      // Handle error here
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

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
        <Field
          type="email"
          name="email"
          placeholder="Enter email address"
          // value={email}
          // onChange={(event: any) => setEmail(event.target.value)}
        />
        <ErrorMessage name="email" component="div" />
        <button type="submit">Send Email</button>
      </Form>
    </Formik>
  );
};

export default EmailForm;
