import { useRef } from "react";
import { format } from "date-fns";
import "./calendar.css"

type Props = {
  data?: string[]; // An array of strings to display in the chart. Each item in the array in our example contains both a date and a time. For example, "2021-03-27 12:30".
  xAxisLabels?: string[]; //An array of strings to use as labels for the X-axis data. These are the days of the week in our example.
  yAxisLabels?: string[]; //An array of strings to use as the labels for the Y-axis data, which will be hours between midnight and 11 PM.
  orientation: string; //A string value to display the chart either vertically or horizontally. The default is vertical.
}

const DAY_INDEXES = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat"
};

interface Dates{
  key:
  [key: string]: string;
}

function formatDayAndHour(chartData: string[]){
  // format the data given in data.ts
  // reduce to return an object that contains the days and hours
  const dates = new Map<number, string[]>
  for (const dataString of chartData){
    const date = new Date(dataString);
    const day = (date.getDay()); // reformat to get the Mon, Tue, Wed... values
    const hour = format(date, "haaa");
    (dates[day]).push(hour);
  }
  return dates;
}

const generateBackgroundColor = (count: number) => {
  return `hsl(196deg 36% ${count > 0 ? 95 - count * 5 : 95}%)`;
};



const Calendar = (props: Props) => {
  return (
    <div>calendar</div>
  )
}

export default Calendar
