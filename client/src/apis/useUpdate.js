import { useEffect, useState } from "react";
import instance from "./apiClient";

const useUpdate = (endpoint, body, headers = {}, method = 'put') => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateData = async () => {
      setIsLoading(true);
      try {
        let response;
        if (method === 'put') {
          response = await instance.put(endpoint, body, { headers });
        } else if (method === 'patch') {
          response = await instance.patch(endpoint, body, { headers });
        } else {
          throw new Error('Invalid method provided. Only "put" or "patch" are allowed.');
        }
        setResponseData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    updateData();

  }, [endpoint, body, headers, method]);

  return { responseData, error, isLoading };
};

export default useUpdate;
