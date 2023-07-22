// Import necessary modules and components
import React, { useContext } from "react";
import { UserContext } from "@/services/userContext"; // Import the UserContext

// Define the EmailListComponent functional component
const EmailListComponent: React.FC = () => {
  // Access the user context
  const userContext = useContext(UserContext);

  // Render the EmailListComponent
  return (
    // Container div for the email list
    <div>
      {/* Unordered list to display the list of emails */}
      <ul>
        {/* Map through the list of emails in the user context and render each email as a list item */}
        {userContext.user?.emails.map((email, index) => (
          // Use the index as the key for each email list item
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

// Export the EmailListComponent as the default export
export default EmailListComponent;
