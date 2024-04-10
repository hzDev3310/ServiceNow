import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGet from '../apis/useGet';
const ProfilScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [removedValue, setRemovedValue] = useState(false);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
      } else {
        navigation.navigate('login');
      }
    } catch (e) {
      console.log("Error occurred while fetching token.");
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setRemovedValue(prevValue => !prevValue);
      console.log('Token removed.');
    } catch (e) {
      console.log('Error occurred while removing token.');
    }
  }
useEffect(()=>{
  getData();
},[removedValue , token])
  useFocusEffect(() => {
    getData();
  });

const {data} =useGet('/auth',{
  Authorization : `Bearer ${token}`
})
  return (
    <View>
      <Text className="mt-10 bg-red-300">{JSON.stringify(data)}</Text>
      <Button title='Logout' onPress={removeValue} />
    </View>
  );
};

export default ProfilScreen;
