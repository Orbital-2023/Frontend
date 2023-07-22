import React, { useContext } from "react";
import { UserContext } from "@/services/userContext";

const EmailListComponent: React.FC = () => {
  const userContext = useContext(UserContext);

  return (
    <div>
      <ul>
        {userContext.user?.emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmailListComponent;
