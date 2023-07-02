import "@/scenes/calendar/calendar.css";
import Heatmap from "@/scenes/calendar/index.tsx";
import { Schedule } from "@/scenes/calendar/index.tsx";
import { useState, useEffect} from "react";
import googleData from "@/scenes/calendar/rawdata/newdata.json";
// import axios from 'axios'

import NavbarCalendar from "@/scenes/calendar/navbar-calendar/navbarCalendar.tsx";

const dayLabels: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hourLabels: string[] = [
  "12am",
  "1am",
  "2am",
  "3am",
  "4am",
  "5am",
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
  "10pm",
  "11pm"
];

export default function Dashboard() {
  const [data, setData] = useState<Schedule>({} as Schedule);

  useEffect(() => {
    setData(JSON.parse(JSON.stringify(googleData)) as Schedule);
  }, []);

  // fetch data from express.js
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/api/calendar/events");
  //       console.log(response.data)
  //       setData(response.data as Schedule);
  //     } catch (error) {
  //       console.error("Error fetching calendar events:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div className="flex flex-col space-y-15">
        <NavbarCalendar></NavbarCalendar>
        <div className="container">
          <Heatmap
            orientation="vertical"
            data={data}
            xAxisLabels={dayLabels}
            yAxisLabels={hourLabels}
          />
        </div>
      </div>
    </>
  );
}
