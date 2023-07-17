import "@/scenes/calendar/calendar.css";
import Heatmap from "@/scenes/calendar/index.tsx";
import { Schedule } from "@/scenes/calendar/index.tsx";
import { useState, useEffect} from "react";
// import calendardata from "@/scenes/calendar/rawdata/segmentdata.json";
import axios from 'axios'

// import components
import NavbarCalendar from "@/scenes/calendar/navbar-calendar/navbarCalendar.tsx";
import CalendarDatePicker from "@/scenes/calendar/datepicker";

// TODO: differentiated by emails (currently scraped, will be just populating with timings)

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

  // useEffect(() => {
  //   setData(JSON.parse(JSON.stringify(calendardata)) as Schedule);
  // }, []);

// const [data, setData] = useState<Schedule>({});

// useEffect(() => {
//   setData(calendardata);
// }, []);

  // const [data, setData] = useState<{ [email: string]: Schedule }>({});

  //  useEffect(() => {
  //    setData(calendardata as { [email: string]: Schedule });
  //  }, []);

  // fetch data from express.js
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/calendar/events");
        console.log(response.data)
        setData(response.data as Schedule);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      }
    };

    fetchData();
  }, []);

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
          {/* insert calendar call with button */}
        </div>
      </div>
    </>
  );
}
