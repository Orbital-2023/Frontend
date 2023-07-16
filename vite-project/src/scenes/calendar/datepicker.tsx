// Insert at the bottom of the Calendar prop 

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";

// datepicker single-date: https://react-tailwindcss-datepicker.vercel.app/Props
// Format: YYYY-MM-DD

const CalendarDatePicker = () => {
    // Define initial values with DateValueType
    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null
    });

    // handle new value in accordance to Datepicker requirements
    const handleValueChange = (newValue: any) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    // link to Backend once clicked
    // Also handles addition of startDate + 7 
    // returns in YYYY-MM-DD format
    const handleSubmit = () => {
        if (value.endDate) {
            const newEndDate = new Date(value.endDate);
            newEndDate.setDate(newEndDate.getDate() + 6);
            setValue(() => ({
            startDate: value.startDate,
            endDate: newEndDate,
            }));
            console.log("Start date:", value.startDate);
            const formattedEndDate = newEndDate.toISOString().split("T")[0];
            console.log("New end date:", formattedEndDate);
        }
    };

    return (
        <div>
            <Datepicker
                asSingle={true}
                value={value}
                onChange={handleValueChange}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
      
    );
};
export default CalendarDatePicker;