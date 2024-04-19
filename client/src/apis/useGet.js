import { useEffect, useState } from "react";
import instance from "./apiClient";

const useGet = (endpoint, dep = null, headers = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    instance.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }).then(res => setData(res.data)).catch(e => setError(e.message))
    setIsLoading(false)
  }, [data, dep, headers]);

  return { data, error, isLoading };
};

export default useGet;
