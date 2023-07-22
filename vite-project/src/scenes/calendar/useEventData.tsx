// Custom hook to fetch event data from the backend API
import { useState, useEffect } from "react";
import axios from "axios";
import { AvailabilityData } from "."; // Importing the AvailabilityData type

const apiUrl = "/api/calendar/events"; // URL for fetching event data

// Custom hook useEventData
const useEventData = (roomId_value: string) => {
  // State to hold the event data and loading status
  const [data, setData] = useState<AvailabilityData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  console.log("inside useEventData.ts"); // Log to indicate when this hook is executed

  // Payload to be sent in the API request
  const payload = {
    roomId: roomId_value?.toString(), // Convert roomId_value to string, if available
  };
  console.log(payload); // Log the payload for debugging purposes

  // fetchData function to make the API request and update the data and loading state
  const fetchData = async () => {
    setLoading(true); // Set loading state to true while fetching data
    try {
      // Make a POST request to the API with the payload
      const response = await axios.post(apiUrl, payload);
      console.log("post successful", response.data); // Log the successful response data
      setData(response.data); // Update the data state with the received data
      setLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.log("Error fetching data:", error); // Log any errors that occur during the request
      setLoading(false); 
    }
  };

  // Use useEffect to fetch data when roomId_value changes or when the component mounts
  useEffect(() => {
    fetchData();
  }, [roomId_value]); // Add roomId_value to the dependency array, so it fetches data whenever roomId changes

  // Return the event data, loading status, and the fetchData function as an object
  return {
    data,
    loading,
    fetchData,
  };
};

export default useEventData;
