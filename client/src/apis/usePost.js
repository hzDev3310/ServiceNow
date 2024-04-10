// usePost.js
import { useState } from "react";
import instance from "./apiClient";

const usePost = () => { // No need to pass parameters here
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Renamed isLoading to loading

  const postData = async (endpoint, body, headers = {}) => { // Receive endpoint, body, and headers here
    setLoading(true);
    try {
      const response = await instance.post(endpoint, body, { headers });
      setResponseData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { postData, responseData, error, loading }; // Return loading instead of isLoading
};

export default usePost;


