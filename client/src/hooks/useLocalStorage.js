
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
const useLocalStorage = (key) => {
  const [data, setData] = useState(null)
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(key,value);
    } catch (e) {
      console.log("saving err .. " + e)
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value
    } catch (e) {
      console.log("getiing err .. " + e)
      return null
    }
  };


  return { getData, storeData }
}

export default useLocalStorage
