// convert start-end to hourly timestamps in the format of  "YYYY-MM-DD 24:00 (-06)",

import { readFile, appendFile } from 'fs';

interface BusyTime {
  start: string;
  end: string;
}

interface Calendar {
  busy: BusyTime[];
}

interface Calendars {
  primary: Calendar;
}

interface FreeBusyResponse {
  kind: string;
  timeMin: string;
  timeMax: string;
  calendars: Calendars;
}

function convertTimeToHourlyTimestamps(json: string): string[] {
  const response: FreeBusyResponse = JSON.parse(json);
  const busyTimes: BusyTime[] = response.calendars.primary.busy;

  const hourlyTimestamps: string[] = [];

  busyTimes.forEach((busyTime) => {
    const startTimestamp: Date = new Date(busyTime.start);
    const endTimestamp: Date = new Date(busyTime.end);

    const currentTimestamp: Date = new Date(startTimestamp);
    while (currentTimestamp < endTimestamp) {
      const formattedTimestamp: string = currentTimestamp
        .toISOString()
        .replace(/T/, ' ')
        .replace(/:\d+\.\d+Z$/, ' (-06)');

      hourlyTimestamps.push(formattedTimestamp);

      currentTimestamp.setHours(currentTimestamp.getHours() + 1);
    }
  });

  return hourlyTimestamps;
}

// Read input JSON from "google.json" --> will fetch from the api later on
readFile('google.json', 'utf8', (err, json) => {
  if (err) {
    console.error('Error reading input file:', err);
    return;
  }

  const hourlyTimestamps: string[] = convertTimeToHourlyTimestamps(json);

  // Export hourlyTimestamps as Data
  const exportStatement = `export const Data: string[] = ${JSON.stringify(hourlyTimestamps)};\n`;

  appendFile('data.tsx', exportStatement, (err) => {
    if (err) {
      console.error('Error exporting hourlyTimestamps:', err);
    } else {
      console.log('hourlyTimestamps exported successfully!');
    }
  });
});
