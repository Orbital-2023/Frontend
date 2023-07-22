// Custom hook useMediaQuery
import { useState, useEffect } from "react";

// Custom hook that takes a query string and returns a boolean indicating whether the media query matches
const useMediaQuery = (query: string) => {
  // State to hold the current match status of the media query
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a media query object based on the provided query string
    const media = window.matchMedia(query);

    // If the match status of the media query has changed, update the matches state
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Function to handle changes to the media query match status
    const listener = () => setMatches(media.matches);

    // Add an event listener for the "resize" event and call the listener function on each resize
    window.addEventListener("resize", listener);

    // Clean up the event listener when the component unmounts to avoid memory leaks
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]); // The effect depends on both the matches state and the query

  // Return the current match status of the media query
  return matches;
};

// Export the useMediaQuery hook as the default export
export default useMediaQuery;
