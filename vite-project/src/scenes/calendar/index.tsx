import { useRef } from "react";
import "./calendar.css";

export interface BusySlot {
  start: string;
  end: string;
}

export interface CalendarData {
  busy: BusySlot[];
}

export interface Calendar {
  [email: string]: CalendarData;
}

export interface FreeBusyResponse {
  data: {
    calendars: Calendar;
  };
}

function formatDayAndHour(date: string): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const formattedDate = new Date(date);
  const day = days[formattedDate.getDay()];
  const hour = formattedDate.toLocaleTimeString([], { hour: 'numeric', hour12: true });
  return `${day}: ${hour}`;
}

function compileDatesFromEmails(dataInput: FreeBusyResponse): Record<string, string[]> {
  const emails = Object.values(dataInput.data.calendars);
  const busySlots: BusySlot[] = [];

  emails.forEach((email) => {
    email.busy.forEach((slot) => {
      busySlots.push(slot);
    });
  });

  const uniqueDates: Set<string> = new Set(busySlots.map((slot) => slot.start.split("T")[0]));
  const dates: Record<string, string[]> = {};

  uniqueDates.forEach((date) => {
    const formattedDate = formatDayAndHour(date);
    const day = formattedDate.split(":")[0];
    const hour = formattedDate.split(":")[1];

    if (!dates[day]) {
      dates[day] = [];
    }

    dates[day].push(hour.trim());
  });

  return dates; // returns in the format: Mon: ['11am', '12pm', '5pm', '6pm', '7pm', '11pm', '12am']
}

// function formatDayAndHour(chartData: FreeBusyResponse): string[] {
//   const emails = Object.values(chartData.data.calendars);
//   const events: Event[] = [];

//   emails.forEach((email) => {
//     email.busy.forEach((slot) => {
//       events.push(slot);
//     });
//   });

//   const dates: string[] = busySlots.map((slot) => slot.start.split("T")[0]);

//   return calendars.reduce((dates: { [key: string]: string[] }, calendar: Calendar) => {
//     const busyEvents = calendar?.busy;

//     if (busyEvents) {
//       busyEvents.forEach((event: Event) => {
//         const { start, end } = event;
//         const startDate = new Date(start);
//         const endDate = new Date(end);
//         const day = DAY_INDEXES[startDate.getDay()];

//         const hours: string[] = [];
//         const currentTime = new Date(startDate);

//         while (currentTime <= endDate) {
//           hours.push(format(currentTime, "haaa"));
//           currentTime.setHours(currentTime.getHours() + 1);
//         }

//         (dates[day] = dates[day] || []).push(...hours);
//       });
//     }

//     console.log(dates)
//     return dates;
//   }, {});
// }

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

interface HeatmapProps {
  data: FreeBusyResponse;
  xAxisLabels: string[];
  yAxisLabels: string[];
  orientation: "vertical" | "horizontal";
}

const Heatmap: React.FC<HeatmapProps> = ({
  data,
  xAxisLabels = [],
  yAxisLabels = [],
  orientation = "vertical"
}) => {
  const minMaxCount = useRef<number[]>([]);
  const formattedData = compileDatesFromEmails(data || {});

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
