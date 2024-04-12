import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { AppText } from "../componenet"
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGet from '../apis/useGet';
const ConversationScreen = ({navigation}) => {
  const [currentUser,setCurrentUser]=useState(null)
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        if (parsedValue.hasOwnProperty('token')) {
          setCurrentUser(parsedValue.userId);
        } else {
          console.log("Token not found in the retrieved data.");
          navigation.navigate('login');
        }
      } else {
        console.log("Token not found in AsyncStorage.");
        navigation.navigate('login');
      }
    } catch (e) {
      console.log("Error occurred while fetching token:", e);
    }
  };
  useFocusEffect(() => {
    getData();
  });

  const {data,isLoading , error} = useGet(`conversation/${currentUser}`) 
  return (
    <View>
      <AppText>
       {JSON.stringify(data)}
      </AppText>
    </View>
  )
}

export default ConversationScreen