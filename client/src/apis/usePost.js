import { useState } from "react";
import baseUrl from "./apiClient";

const usePost = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const postData = async (endpoint, body, headers = { 'Content-Type': 'application/json', }) => {
    setLoading(true);
    try {
      let requestBody;
      if (body instanceof FormData) {
        requestBody = body;
      } else {
        requestBody = JSON.stringify(body);
      }
      const response = await fetch(baseUrl + endpoint, {
        method: 'POST',
        headers,
        body : requestBody
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
