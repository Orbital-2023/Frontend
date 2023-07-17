import "@/scenes/calendar/calendar.css";
import Heatmap from "@/scenes/calendar/index.tsx";
import { AvailabilityData } from "@/scenes/calendar/index.tsx";
import { useState, useEffect} from "react";
// import calendardata from "@/scenes/calendar/rawdata/segmentdata.json";
import axios from 'axios'

// import components
import NavbarCalendar from "@/scenes/calendar/navbar-calendar/navbarCalendar.tsx";
import CalendarDatePicker from "@/scenes/calendar/datepicker";
import EmailForm from "@/scenes/calendar/fetchemail";

// TODO: differentiated by emails (currently scraped, will be just populating with timings)

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
  "11 PM"
];

export default function Dashboard() {
  const appendEmailApiUrl = "/api/meeting/append"; 
  const calendarEventApiUrl = "api/calendar/events";
  const [data, setData] = useState<AvailabilityData[]>([]);

  // console.log("Calendar data", calendardata)
  // useEffect(() => {
  //   setData(calendardata as AvailabilityData[]);
  // }, []);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(calendarEventApiUrl);
      setData(response.data as AvailabilityData[]);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="space-y-15 flex flex-col">
        <NavbarCalendar></NavbarCalendar>
        <div className="container">
          <Heatmap
            orientation="vertical"
            data={data}
            xAxisLabels={dayLabels}
            yAxisLabels={hourLabels}
          />
          <CalendarDatePicker></CalendarDatePicker>
          <EmailForm apiUrl={appendEmailApiUrl}></EmailForm>
        </div>
      </div>
    </>
  );
}
