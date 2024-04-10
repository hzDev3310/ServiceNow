import { useEffect, useState } from "react";
import instance from "./apiClient";

const useDelete = (endpoint, headers = {}) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const deleteData = async () => {
      setIsLoading(true);
      try {
        const response = await instance.delete(endpoint, { headers });
        setResponseData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    deleteData();

  }, [endpoint, headers]);

  return { responseData, error, isLoading };
};

export default useDelete;
