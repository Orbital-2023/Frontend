// Import necessary hooks and components
import { useContext } from "react";
import "@/scenes/calendar/calendar.css";
import Heatmap from "@/scenes/calendar/index.tsx";
// import calendardata from "@/scenes/calendar/rawdata/segmentdata.json";
import { UserContext } from "@/services/userContext";
import useEventData from "@/scenes/calendar/useEventData";

// Import calendar components
import NavbarCalendar from "@/scenes/calendar/navbar-calendar/navbarCalendar.tsx";
import CalendarDatePicker from "@/scenes/calendar/datepicker";
import EmailForm from "@/scenes/calendar/fetchemail";
import Itinerary from "@/scenes/itinerary";
import DisplayEmails from "@/scenes/calendar/display-email/displayemail";

// Constants for day and hour labels
const dayLabels: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hourLabels: string[] = [
  "12AM",
  "1AM",
  "2AM",
  "3AM",
  "4AM",
  "5AM",
  "6AM",
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
  "7PM",
  "8PM",
  "9PM",
  "10PM",
  "11PM",
];

// Define the Dashboard component
export default function Dashboard() {
  // API URLs for appending email and updating meeting time
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
  const emailAppendApiUrl = `${API_BASE_URL}/api/meeting/append`; // requires {roomId, roomPassword, email}
  const timeUpdateApiUrl = `${API_BASE_URL}/api/meeting/timeupdate`; // requires {roomId, startDate, endDate}

  // Access the user context
  const userContext = useContext(UserContext);
  console.log(userContext.user?.roomId);
  console.log(userContext.user?.roomPassword);

  // Get roomId from the user context, if available, or set it to an empty string
  const roomId = userContext.user?.roomId;
  const validRoomId = roomId || "";

  // Fetch event data using the custom hook useEventData
  const { data, loading, fetchData } = useEventData(validRoomId);

  // Function to handle the reload button click
  const handleReloadClick = () => {
    fetchData();
  };

  return (
    <>
      <div>
        {/* Render the Navbar for the calendar */}
        <NavbarCalendar></NavbarCalendar>
        <div className="page">
          <div className="container">
            <div className="flex justify-center">
              {/* Render the Heatmap component */}
              <Heatmap
                orientation="vertical"
                data={data}
                xAxisLabels={dayLabels}
                yAxisLabels={hourLabels}
              />
            </div>
            {/* Render the CalendarDatePicker component */}
            <CalendarDatePicker apiUrl={timeUpdateApiUrl}></CalendarDatePicker>
            {/* Render the EmailForm component */}
            <EmailForm apiUrl={emailAppendApiUrl}></EmailForm>
            <div className="reload-button-container">
              {/* Button to reload data with a loading state */}
              <button onClick={handleReloadClick} disabled={loading}>
                {loading ? "Loading..." : "Reload Data"}
              </button>
            </div>
          </div>
          <div className="container">
            <div className="container flex justify-center">
              {/* Render the DisplayEmails component */}
              <DisplayEmails></DisplayEmails>
            </div>
            <div className="container flex justify-center">
              {/* Render the Itinerary component */}
              <Itinerary></Itinerary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
