import React, { useState } from "react";
import axios from "axios";

interface EmailFormProps {
  apiUrl: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ apiUrl }) => {
  const [email, setEmail] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform the API POST request using Axios
    axios
      .post(apiUrl, { email })
      .then((response) => {
        // Handle success response here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error here
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={handleInputChange}
      />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
