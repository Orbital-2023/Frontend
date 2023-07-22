import { useState, useEffect, useContext } from "react";
import "@/scenes/calendar/calendar.css";
import Heatmap from "@/scenes/calendar/index.tsx";
import { AvailabilityData } from "@/scenes/calendar/index.tsx";
// import calendardata from "@/scenes/calendar/rawdata/segmentdata.json";
import axios from "axios";
import { UserContext } from "@/services/userContext";
import useEventData from "@/scenes/calendar/useEventData";

// import components
import NavbarCalendar from "@/scenes/calendar/navbar-calendar/navbarCalendar.tsx";
import CalendarDatePicker from "@/scenes/calendar/datepicker";
import EmailForm from "@/scenes/calendar/fetchemail";
import Itinerary from "@/scenes/itinerary";


const dayLabels: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hourLabels: string[] = [
  "12 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
];

export default function Dashboard() {
  // const calendarEventApiUrl = "/api/calendar/events";
  const emailAppendApiUrl = "/api/meeting/append"; // requires {roomId, roomPassword, email}
  const timeUpdateApiUrl = "/api/meeting/timeupdate"; // requires {roomId, startDate, endDate}

  const userContext = useContext(UserContext);
  const roomId = userContext.user?.roomId;
  // If roomId is undefined, set it to an empty string
  const validRoomId = roomId || "";
  const { data, loading, fetchData } = useEventData(validRoomId);

  console.log(userContext.user?.roomId);
  console.log(userContext.user?.roomPassword);

  // Function to handle the reload button click
  const handleReloadClick = () => {
    fetchData();
  };

  // console.log("Calendar data", calendardata)
  // useEffect(() => {
  //   setData(calendardata as AvailabilityData[]);
  // }, []);

  return (
    <>
      <div>
        <NavbarCalendar></NavbarCalendar>
        <div className="page">
          <div className="container">
            <div className="flex justify-center">
              <Heatmap
                orientation="vertical"
                data={data}
                xAxisLabels={dayLabels}
                yAxisLabels={hourLabels}
              />
            </div>
            <CalendarDatePicker apiUrl={timeUpdateApiUrl}></CalendarDatePicker>
            <EmailForm apiUrl={emailAppendApiUrl}></EmailForm>
            <div className="reload-button-container">
              <button onClick={handleReloadClick} disabled={loading}>
                {loading ? "Loading..." : "Reload Data"}
              </button>
            </div>
          </div>
          <div className="container">
            <div className="container flex justify-center">
              <Itinerary></Itinerary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
