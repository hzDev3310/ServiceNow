
import { useEffect } from "react";
import { usePost } from "../apis";
import AsyncStorage from '@react-native-async-storage/async-storage';
const useLogin = (phoneNumber, password) => {
  const { postData, loading, error, responseData } = usePost();

  const login = async () => {
    await postData("/auth/login", { phoneNumber, password });
  };

  useEffect(() => {
    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('token', value);
      } catch (e) {
        console.log(e)
      }
    };
    if (responseData && responseData.token) {
      storeData(responseData.token);
    }
  }, [responseData]);

  return {
    responseData,
    login,
    loading,
    error: responseData?.message || error?.message || null
  };
};

export default useLogin;