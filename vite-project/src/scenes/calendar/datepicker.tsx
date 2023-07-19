// send as object, exactly same as the following:
// {
//     "roomId": "aabbc",
//     "startDate": "1234-33-44",
//     "endDate": "1234-55-44"
// } 

import { useState, useContext } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import axios from "axios";
import { UserContext } from "@/services/userContext";

// datepicker single-date: https://react-tailwindcss-datepicker.vercel.app/Props
// Format: YYYY-MM-DD

interface DatePickerProps{
    apiUrl: string;
}

const CalendarDatePicker: React.FC<DatePickerProps> = ({ apiUrl }) => {
  // Define initial values with DateValueType
    const [value, setValue] = useState<DateValueType | null>({
    startDate: null,
    endDate: null,
    });

    // handle new value in accordance to Datepicker requirements
    const handleValueChange = (newValue: any | null) => {
    console.log("newValue:", newValue);
    setValue(newValue);
    };

    const userContext = useContext(UserContext);

    // Also handles addition of startDate + 7
    // returns in YYYY-MM-DD format
    const handleSubmit = async () => {
    if (value && value.endDate && value.startDate) {
        const newEndDate = new Date(value.endDate);
        newEndDate.setDate(newEndDate.getDate() + 6);
        setValue(() => ({
        startDate: value.startDate,
        endDate: newEndDate,
        }));
        console.log("Start date:", value.startDate);
        const formattedEndDate = newEndDate.toISOString().split("T")[0];
        console.log("New end date:", formattedEndDate);
        console.log(userContext.user?.roomId)
        const payload = {
          roomId: userContext.user?.roomId.toString(),
          startDate: value.startDate.toString(),
          endDate: formattedEndDate.toString(),
        };
        
        // Submits to backend via API call
        try {
          const response = await axios.post(apiUrl, payload);

          // Handle the response
          if (response.status === 200) {
            // Success: Handle the response if needed
            console.log("Request succeeded!");
          } else {
            // Error: Handle the error response
            console.error(
              "Request failed:",
              response.status,
              response.statusText
            );
          }
        } catch (error) {
          // Error: Handle the request error
          console.error("Request failed:", error);
        }
    }
    };

    return (
    <div>
        <Datepicker asSingle={true} value={value} onChange={handleValueChange} />
        <button onClick={handleSubmit}>Submit</button>
    </div>
    );
};
export default CalendarDatePicker;

