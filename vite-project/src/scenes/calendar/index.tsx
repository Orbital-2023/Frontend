import "./calendar.css";

const generateBackgroundColor = (count: number) => {
  return `hsl(196deg 36% ${count > 0 ? 95 - count * 5 : 95}%)`;
};

export interface Schedule {
  [day: string]: string[];
}

export interface AvailabilityData {
  email: string;
  availability: Schedule;
}

interface HeatmapProps {
  data: AvailabilityData[];
  xAxisLabels: string[];
  yAxisLabels: string[];
  orientation: "vertical" | "horizontal";
}

const Heatmap: React.FC<HeatmapProps> = ({
  data,
  xAxisLabels = [],
  yAxisLabels = [],
  orientation = "vertical",
}) => {
  // const minMaxCount = useRef<number[]>([]);
  const formattedData: Schedule = {};

data.forEach((item: AvailabilityData) => {
  Object.entries(item.availability).forEach(([day, hours]) => {
    if (!formattedData[day]) {
      formattedData[day] = [];
    }
    formattedData[day].push(...hours.map((hour) => hour.replace(/\s+/g, "")));
  });
});
  // console.log("Formatted Data:", formattedData); // Log the formattedData object

  const gridCells: {
    [key: string]: { hours: { dayHour: string; count: number }[] };
  } = {};

  xAxisLabels.forEach((dayLabel) => {
    const dayAndHour: { dayHour: string; count: number }[] = [];
    yAxisLabels.forEach((hourLabel) => {
      // console.log(dayLabel, formattedData[dayLabel])
      const count =
        formattedData[dayLabel]?.reduce((total: number, hour: string) => {
          return hour.includes(hourLabel) ? total + 1 : total;
        }, 0) || 0;
      // console.log(`Count for ${dayLabel} ${hourLabel}:`, count); // Log the count value

      dayAndHour.push({
        dayHour: `${dayLabel} ${hourLabel}`,
        count,
      });
    });

    gridCells[dayLabel] = {
      hours: dayAndHour,
    };
  });

  // console.log("Grid Cells:", gridCells); // Log the gridCells object
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
    </div>
  );
};

export default Heatmap;
