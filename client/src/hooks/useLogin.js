
import { useEffect } from "react";
import  usePost  from "../apis/usePost";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsLogin } from "../store";
const useLogin = () => {
const {setIsLogin}= useIsLogin() 

  const { postData, loading, error, responseData } = usePost();

  const login = async (phoneNumber, password) => {
    await postData("/auth/login", {phoneNumber, password});
   
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('token', jsonValue);
    } catch (e) {
      console.log(e)
    }
  };
  useEffect(() => {
    if (responseData && responseData.token) {
      storeData(responseData);
      setIsLogin(true)
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