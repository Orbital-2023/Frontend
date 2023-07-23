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
  const [error, setError] = useState<string | null>(null); // State variable to hold the error message
  const [success, setSuccess] = useState<string | null>(null); // State variable to hold the success message

  // handle new value in accordance to Datepicker requirements
  const handleValueChange = (newValue: any | null) => {
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
      const formattedEndDate = newEndDate.toISOString().split("T")[0];
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
          setSuccess("Request succeeded!");
        } else {
          // Error: Set the error message
          setError(
            "Request failed: " + response.status + " " + response.statusText
          );
        }
      } catch (error) {
        // Error: Set the error message
        setError("Request failed: " + (error as Error).message);
      }
    }
  };

  return (
    <div>
      <Datepicker asSingle={true} value={value} onChange={handleValueChange} />
      <button onClick={handleSubmit}>Submit</button>
      {/* Render the success message if the request is successful */}
      {success && <p>{success}</p>}
      {/* Render the error message if there is an error */}
      {error && <p>{error}</p>}
    </div>
  );
};
export default CalendarDatePicker;

