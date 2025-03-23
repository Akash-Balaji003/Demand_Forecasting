import { useState, useEffect } from "react";

const API_URL = "http://your-backend.com/api/states"; // Replace with actual API

const useStateDescriptions = () => {
  const [stateDescriptions, setStateDescriptions] = useState({});

  useEffect(() => {
    const fetchStateDescriptions = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setStateDescriptions(data);
      } catch (error) {
        console.error("Error fetching state descriptions:", error);
      }
    };

    fetchStateDescriptions();
  }, []);

  return stateDescriptions;
};

export default useStateDescriptions;
