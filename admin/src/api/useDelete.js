import {  useState } from "react";
import {baseUrl} from "./apiclient"
const useDelete = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


    const handleDelete = async (endpoint) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", 
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

  


  return { handleDelete,responseData, error, isLoading };
};

export default useDelete;
