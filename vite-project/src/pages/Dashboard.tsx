import "@/scenes/calendar/calendar.css";
import Heatmap from "@/scenes/calendar/index.tsx";
import { useState, useEffect } from "react";
import googleData from "@/scenes/calendar/rawdata/newdata.json";
import NavbarCalendar from "@/scenes/calendar/navbar-calendar/navbarCalendar.tsx";

interface BusySlot {
  start: string;
  end: string;
}

interface CalendarData {
  busy: BusySlot[];
}

interface Calendar {
  [email: string]: CalendarData;
}

interface FreeBusyResponse {
  data: {
    calendars: Calendar;
  };
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
  const [data, setData] = useState<FreeBusyResponse | undefined>(undefined);

  useEffect(() => {
    setData(googleData?.data);
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-15">
        <NavbarCalendar></NavbarCalendar>
        <div className="container">
          <Heatmap
            orientation="vertical"
            data={data} // passing googleData directly
            xAxisLabels={dayLabels}
            yAxisLabels={hourLabels}
          />
        </div>
      </div>
    </>
  );
}
