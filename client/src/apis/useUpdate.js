import { useState } from "react";
import instance from "./apiClient";

const useUpdate = (method = 'put') => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateData = async (endpoint, body, headers = {}) => {
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
      setError(null)
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { updateData, responseData, error, isLoading };
};

export default useUpdate;
