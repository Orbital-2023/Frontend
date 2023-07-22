import {render, screen} from "@testing-library/react"
import App from "./App";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

describe('Landing Page', () => {
    it("Should have WhenToMeet_NUS",
      () => {
        render(<App />);
        const message = screen.queryByText(/Loading/i);
        expect(message).toBeVisible();
      })
})

// test button component