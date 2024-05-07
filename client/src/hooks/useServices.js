import { useEffect, useState } from "react";
import baseUrl from "../apis/apiClient";
const useServices = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
    setIsLoading(true)
      try {
        const response = await fetch(baseUrl + endpoint, {
          method: 'GET',
          headers:{ 'Content-Type': 'application/json' } 
        });
        const responseData = await response.json();
        setData(responseData);
        setError(null)
      } catch (error) {
        setError(error);
        setData(null)
      }finally {setIsLoading(false)}
    
    };

    fetchData();
    

  }, [ endpoint]);

  return { data, error, isLoading };
};

export default useServices;
