import { useEffect, useState } from "react";
import baseUrl from "./apiClient";
const useDelete = (endpoint, headers = {}) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: "DELETE",
          headers: {
            ...headers,
            "Content-Type": "application/json", 
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, headers]);

  return { responseData, error, isLoading };
};

export default useDelete;
