// Import the OnLogin component from the "login" scene
import Login from "@/scenes/login";

// Define the LoginPage component
export default function LoginPage() {
  // Render the LoginPage component
  return (
    // Apply a background color to the entire app
    <div className="app bg-gray-20">
      {/* Render the OnLogin component */}
      <Login></Login>
    </div>
  );
}
