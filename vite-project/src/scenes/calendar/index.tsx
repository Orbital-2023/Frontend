// import { useRef } from "react";
// import { format } from "date-fns";
// import "./calendar.css";

// const DAY_INDEXES: { [index: number]: string } = {
//   0: "Sun",
//   1: "Mon",
//   2: "Tue",
//   3: "Wed",
//   4: "Thu",
//   5: "Fri",
//   6: "Sat"
// };

// type ChartData = string[];

// interface FormattedData {
//   [index: string]: string[];
// }

// interface HeatmapProps {
//   data?: ChartData; // Update the type here
//   xAxisLabels?: string[];
//   yAxisLabels?: string[];
//   orientation?: "vertical" | "horizontal";
// }

// function formatDayAndHour(chartData: ChartData): FormattedData {
//   const dates: FormattedData = {};

//   chartData.forEach((dateString: string) => {
//     const date = new Date(dateString);
//     const day = DAY_INDEXES[date.getDay()];
//     const hour = format(date, "haaa");

//     if (!dates[day]) {
//       dates[day] = [];
//     }

//     dates[day].push(hour);
//   });

//   return dates;
// }

// const generateBackgroundColor = (count: number): string => {
//   return `hsl(196deg 36% ${count > 0 ? 95 - count * 5 : 95}%)`;
// };

// function generateLegend(data: number[]): JSX.Element {
//   const deduped: number[] = [...new Set(data)];
//   const minValue: number = Math.min(...deduped);
//   const maxValue: number = Math.max(...deduped);
//   const minColor: string = generateBackgroundColor(minValue);
//   const maxColor: string = generateBackgroundColor(maxValue);

//   return (
//     <div className="legend">
//       <div
//         className="cell"
//         style={{
//           background: `linear-gradient(90deg, ${minColor} 0%, ${maxColor} 100%)`
//         }}
//       />
//       <div className="labels">
//         <span className="label">{minValue}</span>
//         <span className="label">{maxValue}</span>
//       </div>
//     </div>
//   );
// }

// const Heatmap: React.FC<HeatmapProps> = ({
//   data = [],
//   xAxisLabels = [],
//   yAxisLabels = [],
//   orientation = "vertical"
// }) => {
//   const minMaxCount = useRef<number[]>([]);
//   const formattedData: { [key: string]: string[] } = formatDayAndHour(data);

//   const gridCells: {
//     [key: string]: { hours: { dayHour: string; count: number }[] };
//   } = xAxisLabels.reduce((days, dayLabel) => {
//     const dayAndHour: { dayHour: string; count: number }[] = yAxisLabels.reduce(
//       (hours, hourLabel) => {
//         const count =
//           formattedData[dayLabel]?.reduce((total, hour) => {
//             return hour === hourLabel ? total + 1 : total;
//           }, 0) || 0;

//         minMaxCount.current = [...minMaxCount.current, count];

//         return [
//           ...hours,
//           {
//             dayHour: `${dayLabel} ${hourLabel}`,
//             count
//           }
//         ];
//       },
//       [] as { dayHour: string; count: number }[]
//     );

//     return {
//       ...days,
//       [dayLabel]: {
//         hours: dayAndHour
//       }
//     };
//   }, {});

//   return (
//     <div className="container">
//       <div className={`heatmap ${orientation}`}>
//         {Object.keys(gridCells).map((day) => (
//           <div key={day} className="cells col">
//             {gridCells[day].hours.map(({ dayHour, count }) => (
//               <div
//                 key={dayHour}
//                 className="cell"
//                 style={{ backgroundColor: generateBackgroundColor(count) }}
//               >
//                 <div className="tooltip" role="tooltip">
//                   <span className="count">{count}</span>
//                   <span>{dayHour}</span>
//                 </div>
//               </div>
//             ))}
//             <span className="label">{day}</span>
//           </div>
//         ))}
//         <div className="col">
//           {yAxisLabels.map((label, index) => (
//             // Only render every other label text
//             <span key={label} className="label">
//               {index % 2 === 0 ? label : null}
//             </span>
//           ))}
//         </div>
//       </div>
//       {generateLegend(minMaxCount.current)}
//     </div>
//   );
// };

// export default Heatmap;

import { useRef } from "react";
import { format } from "date-fns";
import "./calendar.css";

const DAY_INDEXES: { [key: number]: string } = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat"
};

function formatDayAndHour(chartData: string[]) {
  return chartData.reduce((dates: { [key: string]: string[] }, dateString) => {
    const date = new Date(dateString);
    const day = DAY_INDEXES[date.getDay()];
    const hour = format(date, "haaa");

    (dates[day] = dates[day] || []).push(hour);

    return dates;
  }, {});
}

const generateBackgroundColor = (count: number) => {
  return `hsl(196deg 36% ${count > 0 ? 95 - count * 5 : 95}%)`;
};

function generateLegend(data: number[]) {
  const deduped = [...new Set(data)];
  const minValue = Math.min(...deduped);
  const maxValue = Math.max(...deduped);
  const minColor = generateBackgroundColor(minValue);
  const maxColor = generateBackgroundColor(maxValue);

  return (
    <div className="legend">
      <div
        className="cell"
        style={{
          background: `linear-gradient(90deg, ${minColor} 0%, ${maxColor} 100%)`
        }}
      />
      <div className="labels">
        <span className="label">{minValue}</span>
        <span className="label">{maxValue}</span>
      </div>
    </div>
  );
}

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-heatmap-chart-component
 */
interface HeatmapProps {
  data: string[];
  xAxisLabels: string[];
  yAxisLabels: string[];
  orientation: "vertical" | "horizontal";
}

const Heatmap: React.FC<HeatmapProps> = ({
  data = [],
  xAxisLabels = [],
  yAxisLabels = [],
  orientation = "vertical"
}) => {
  const minMaxCount = useRef<number[]>([]);
  const formattedData = formatDayAndHour(data);

  const gridCells = xAxisLabels.reduce((days: { [key: string]: { hours: { dayHour: string; count: number }[] } }, dayLabel) => {
    const dayAndHour = yAxisLabels.reduce((hours: { dayHour: string; count: number }[], hourLabel) => {
      const count = formattedData[dayLabel]?.reduce((total, hour) => {
        return hour === hourLabel ? total + 1 : total;
      }, 0);

      minMaxCount.current = [...minMaxCount.current, count];

      return [
        ...hours,
        {
          dayHour: `${dayLabel} ${hourLabel}`,
          count
        }
      ];
    }, []);

    return {
      ...days,
      [dayLabel]: {
        hours: dayAndHour
      }
    };
  }, {});

  return (
    <div className="container">
      <div className={`heatmap ${orientation}`}>
        {Object.keys(gridCells).map((day) => (
          <div key={day} className="cells col">
            {gridCells[day].hours.map(({ dayHour, count }) => (
              <div
                key={dayHour}
                className="cell"
                style={{ backgroundColor: generateBackgroundColor(count) }}
              >
                <div className="tooltip" role="tooltip">
                  <span className="count">{count}</span>
                  <span>{dayHour}</span>
                </div>
              </div>
            ))}
            <span className="label">{day}</span>
          </div>
        ))}
        <div className="col">
          {yAxisLabels.map((label, index) => (
            // Only render every other label text
            <span key={label} className="label">
              {index % 2 === 0 ? label : null}
            </span>
          ))}
        </div>
      </div>
      {generateLegend(minMaxCount.current)}
    </div>
  );
};

export default Heatmap;
