import { useState } from "react";
import baseUrl from "./apiClient";

const useUpdate = (method = 'put') => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateData = async (endpoint, body, headers = {}) => {
    setIsLoading(true);
    try {
      let response;
      if (method === 'put') {
        response = await fetch(baseUrl+endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify(body)
        });
      } else if (method === 'patch') {
        response = await fetch(baseUrl+endpoint, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify(body)
        });
      } else {
        throw new Error('Invalid method provided. Only "put" or "patch" are allowed.');
      }
      const responseData = await response.json();
      setResponseData(responseData);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateData, responseData, error, isLoading };
};

export default useUpdate;
