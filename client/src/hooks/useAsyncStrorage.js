import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 

const useAsyncStorage = (key, defaultValue = null) => {
    const [data, setData] = useState(defaultValue);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            console.log("Retrieved value:", jsonValue);
            if (jsonValue !== null) {
                // For demonstration, we'll just set the data to the JWT string
                setData(jsonValue);
            } else {
                console.log("No data found for key:", key);
            }
        } catch (error) {
            console.error("Error retrieving data from AsyncStorage:", error);
        }
    };
    
    

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            setData(value);
        } catch (error) {
            console.error("Error storing data in AsyncStorage:", error);
        }
    };

    const removeData = async () => {
        try {
            await AsyncStorage.removeItem(key);
            setData(defaultValue);
            console.log('Data removed for key:', key);
        } catch (error) {
            console.error("Error removing data from AsyncStorage:", error);
        }
    };

    useEffect(() => {
        getData();
    }, [data]);

    useFocusEffect(()=>{
        getData()
    }); 

    return { data, storeData, removeData };
};

export default useAsyncStorage;
