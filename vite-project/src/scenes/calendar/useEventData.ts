import { useState, useEffect } from "react";
import axios from "axios";
import { AvailabilityData } from ".";

const useEventData = (roomId: string) => {
  const [data, setData] = useState<AvailabilityData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  console.log("inside useEventData.ts");

  // Function to simulate the delay
  const addDelay = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      await addDelay(5000); // Added delay to help with backend loading (remove this in production)
      const response = await axios.get<AvailabilityData[]>(
        "/api/calendar/events?roomId=${roomId}"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [roomId]); // Add roomId to the dependency array, so it fetches data whenever roomId changes
  
  return {
    data,
    loading,
    fetchData,
  };
};

export default useEventData;
