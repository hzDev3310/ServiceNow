import { useEffect, useState } from "react";
import baseUrl from "./apiClient";

const useGet = (endpoint, headers = { 'Content-Type': 'application/json' } , dep=[]) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
    setIsLoading(true)
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
        setError(null)
      } catch (error) {
        setError(error);
        setData(null)
      }finally {setIsLoading(false)}
    
    };

    fetchData();

  }, [endpoint ,...dep]);

  return { data, error, isLoading };
};

export default useGet;
