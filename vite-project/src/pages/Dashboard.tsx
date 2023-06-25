import "@/scenes/calendar/calendar.css";
import Heatmap from "@/scenes/calendar/index.tsx";
import { useState, useEffect} from "react";
import googleData from "@/scenes/calendar/rawdata/google.json";
import NavbarCalendar from "@/scenes/calendar/navbar-calendar/navbarCalendar.tsx";

interface Event {
  start: string;
  end: string;
}

interface Calendar {
  busy: Event[];
}

interface CalendarData {
  primary: Calendar;
}

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
  const [data, setData] = useState<CalendarData | undefined>(undefined);

  useEffect(() => {
    setData(googleData?.calendars);
  }, []);

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


// import { Data } from "./scenes/calendar/rawdata/data.tsx";

  // fetch API, change Data to data under <Heatmap>
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("YOUR_GOOGLE_API_URL");
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // TODO read from the google.json file instead
