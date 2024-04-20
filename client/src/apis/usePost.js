import { useState } from "react";
import baseUrl from "./apiClient";

const usePost = () => { 
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const postData = async (endpoint, body, headers = {}) => {
    setLoading(true);
    try {
      const response = await fetch(baseUrl+endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(body)
      });

    

      const responseData = await response.json();
      setResponseData(responseData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { postData, responseData, error, loading }; 
};

export default usePost;
