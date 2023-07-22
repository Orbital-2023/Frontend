// Import necessary components and hooks
import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import JoinUs from "@/scenes/joinnus";
import { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types"; // Importing the SelectedPage type

// Define the Landing component
function Landing() {
  // State to manage the selected page and whether the user is at the top of the page
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home // Set the default selected page to "Home"
  );

  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true); // Set the default state to true, indicating that the user is at the top of the page

  useEffect(() => {
    // Function to handle scrolling and update the states accordingly
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true); // If the user is at the top of the page, set isTopOfPage to true
        setSelectedPage(SelectedPage.Home); // Set the selected page to "Home" when at the top of the page
      }
      if (window.scrollY !== 0) setIsTopOfPage(false); // If the user is not at the top of the page, set isTopOfPage to false
    };

    // Add an event listener for the scroll event and call the handleScroll function
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render the Landing component
  return (
    <div className="app bg-gray-20">
      {/* Render the Navbar component */}
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      {/* Render the Home component */}
      <Home setSelectedPage={setSelectedPage} />
      {/* Render the JoinUs component */}
      <JoinUs setSelectedPage={setSelectedPage} />
    </div>
  );
}

// Export the Landing component as the default export
export default Landing;
