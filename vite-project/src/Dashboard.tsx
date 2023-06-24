// import React from 'react';
// import "./scenes/calendar/calendar.css"
// import Heatmap from './scenes/calendar';
// // import HeatmapProps from "./scenes/calendar";
// import data from './scenes/calendar'; // need to make sure that the 'data' being imported is an array of strings
// console.log("in dashboard")

// const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const hourLabels = [
//   "12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am",
//   "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"
// ];
// console.log(data)
// const convertedData = Array.isArray(data) ? data : [];
// console.log(convertedData)

// const Dashboard: React.FC = () => {
//   return (
//     <>
//       <div className="container">
//         <Heatmap
//           orientation="vertical"
//           data={convertedData}
//           xAxisLabels={dayLabels}
//           yAxisLabels={hourLabels}
//         />
//       </div>
//       {/* <div className="container">
//         <Heatmap
//           orientation="horizontal"
//           data={convertedData}
//           xAxisLabels={dayLabels}
//           yAxisLabels={hourLabels}
//         />
//       </div> */}
//     </>
//   );
// };

// export default Dashboard;

import "./scenes/calendar/calendar.css"
import Heatmap from "./scenes/calendar/index.js";
import { Data } from "./scenes/calendar/data.js";

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

export default function App() {
  return (
    <>
      <div className="container">
        <Heatmap
          orientation="vertical"
          data={Data}
          xAxisLabels={dayLabels}
          yAxisLabels={hourLabels}
        />
      </div>
      <div className="container">
        <Heatmap
          orientation="horizontal"
          data={Data}
          xAxisLabels={dayLabels}
          yAxisLabels={hourLabels}
        />
      </div>
    </>
  );
}
