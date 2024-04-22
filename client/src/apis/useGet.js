import { useEffect, useState } from "react";
import baseUrl from "./apiClient";

const useGet = (endpoint, headers = { 'Content-Type': 'application/json' }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
    
      try {
        const response = await fetch(baseUrl + endpoint, {
          method: 'GET',
          headers: {
            ...headers
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error);
      }
    
    };

    fetchData();

  }, [data,endpoint,headers]);

  return { data, error, isLoading };
};

export default useGet;
