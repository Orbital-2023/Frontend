// Import necessary modules and components
import Logo from "@/assets/Logo.png"; // Import the Logo image from assets
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import { useContext } from "react"; // Import the useContext hook from react
import { UserContext } from "@/services/userContext"; // Import the UserContext

// Define the NavbarCalendar functional component
const NavbarCalendar = () => {
  // Access the user context
  const userContext = useContext(UserContext);

  // Function to handle logout by setting the user context to null
  const handleLogout = () => {
    userContext.setUser(null);
  };

  // CSS classes for styling
  const flexBetween = "flex items-center justify-between";
  const navbarBackground = "bg-primary-100 drop-shadow";

  // Render the NavbarCalendar component
  return (
    <nav>
      {/* Container for the navbar */}
      <div
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* LEFT SIDE */}
            {/* Display the logo image */}
            <img alt="logo" src={Logo} />
            {/* RIGHT SIDE */}
            <div className={`${flexBetween} w-full`}>
              <div className={`${flexBetween} gap-8 text-sm`}>
                {/* Button (Content missing) */}
                <button></button>
              </div>
              <div className={`${flexBetween} gap-8`}>
                {/* Link to the landing page */}
                <Link to="/">
                  {/* Button to trigger logout with specific styles */}
                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
                  >
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Export the NavbarCalendar component as the default export
export default NavbarCalendar;
