import { useState } from "react";
import { baseUrl } from "./apiclient";


const usePost = (endpoint="" , headers = { 'Content-Type': 'application/json' }) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const postData = async ( body) => {
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
      if (responseData?.message) {throw new Error(responseData?.message)}
      else {setResponseData(responseData);
        setError(null)
      }
    } catch (error) {
      setError(error);
      setResponseData(null)
    
    } finally {
      setLoading(false);
    }
  };

  return { postData, responseData, error, loading };
};

export default usePost;
