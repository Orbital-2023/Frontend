// Import necessary modules and components
import React from "react";
import EmailListComponent from "./emailListComponent"; // Import the EmailListComponent

// Define the DisplayEmails functional component
const DisplayEmails: React.FC = () => {
  // Render the DisplayEmails component
  return (
    // Container for the email list section with margin and centering styles
    <div className="container mx-auto my-4">
      {/* Heading for the email list */}
      <h1 className="mb-4 text-3xl font-bold">Email List</h1>
      {/* Render the EmailListComponent to display the list of emails */}
      <EmailListComponent />
    </div>
  );
};

// Export the DisplayEmails component as the default export
export default DisplayEmails;
