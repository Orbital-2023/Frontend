// possibly migrate this to a separate scene for folder conformity
import React, { useContext } from "react";
import EmailListComponent from "./emailListComponent";

const DisplayEmails: React.FC = () => {

  return (
    <div className="container mx-auto my-4">
      <h1 className="mb-4 text-3xl font-bold">Email List</h1>
      <EmailListComponent />
    </div>
  );
};

export default DisplayEmails;
