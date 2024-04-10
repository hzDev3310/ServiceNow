import { useEffect, useState } from "react";
import axios from 'axios';
import instance from "./apiClient";

const useGet = (endpoint, headers = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await instance.get(endpoint, { headers });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, [endpoint, headers]);

  return { data, error, isLoading };
};

export default useGet;
