import "intersection-observer"; // Import the polyfill here
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, expect, it, afterEach, beforeEach} from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter} from "react-router-dom"; // Import MemoryRouter for testing navigation
import { UserContextProvider } from "@/services/userContext"; // Make sure to export and import the UserContextProvider

// import Component
import Login from "./scenes/login";
import LoginPage from "./pages/Login";

describe("Login component", () => {
  let mock: MockAdapter;
  const API_BASE_URL = "/api"; // Mock the API base URL

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });


 it("should display error message on API call failure", async () => {
    const errorMessage = "An error occurred, reloading page"; // Define the error message expected in the test
 
  mock.onPost(`${API_BASE_URL}/api/login`).reply(500, {
     message: "Login failed",
   });

   render(
     <MemoryRouter>
       <UserContextProvider>
         <Login />
       </UserContextProvider>
     </MemoryRouter>
   );

   const roomIdInput = screen.getByTestId("room-id-input");
   const passwordInput = screen.getByTestId("password-input"); // Target the password input field by its test ID
   const loginButton = screen.getByTestId("login-button"); // Target the login button by its test ID

   fireEvent.change(roomIdInput, { target: { value: "123" } });
   fireEvent.change(passwordInput, { target: { value: "password123" } });
   fireEvent.click(loginButton);

   await waitFor(() => {
     expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument(); // Check for the error message using the variable
   });
 });
});

describe("LoginPage", () => {
  it("renders with correct background className", () => {
    // Render the LoginPage component
    const { container } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Get the root div with the app className
    const appDiv = container.querySelector(".app");

    // Check if the className includes "bg-gray-20"
    expect(appDiv).toHaveClass("bg-gray-20");
  });
});