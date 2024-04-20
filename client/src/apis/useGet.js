import { useEffect, useState } from "react";
import baseUrl from "./apiClient";

const useGet = (endpoint, dep = null, headers = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(baseUrl+endpoint, {
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
        });
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false)
    };

    fetchData();
  }, [endpoint, dep, headers]);

  return { data, error, isLoading };
};

export default useGet;
