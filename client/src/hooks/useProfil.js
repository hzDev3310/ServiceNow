import { useEffect, useState } from "react";
import baseUrl from "../apis/apiClient";


const useProfil = (token) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
    setIsLoading(true)
      try {
        const response = await fetch(baseUrl + "/auth", {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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

  }, [token, data]);

  return { data, error, isLoading };
};

export default useProfil;
