import React, { useEffect, useState } from 'react';
import { useDarkMode, useIsLogin } from '../store';
import useGet from '../apis/useGet';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {  Image, ScrollView, StatusBar, Text, View } from 'react-native';
import { AppActivityIndicator, AppBadge, AppButton, AppText, ServiceUpdate, UserDetailsUpdate } from "../componenet";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../colors';
import { useFocusEffect } from '@react-navigation/native';
const ProfilScreen = ({ navigation }) => {
  const {setIsLogin}= useIsLogin() 
  const { darkMode } = useDarkMode()
  const [token, setToken] = useState(null);
  const [removedValue, setRemovedValue] = useState(false);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        if (parsedValue.hasOwnProperty('token')) {
          setToken(parsedValue.token);
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


  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsLogin(false)
      console.log('Token removed.');
    } catch (e) {
      console.log('Error occurred while removing token.');
    }
  }
  useFocusEffect(() => {
    getData()
  })
  const { data, error, isLoading } = useGet('/auth', {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },[token])
  return (
    <View>
      <StatusBar  />


      {error && <View className="flex flex-1 justify-center items-center">
        <Text style={{ color: colors.danger }} >
          check your internt connexion
        </Text>
      </View>}
      {isLoading &&
        <AppActivityIndicator />}
      {
        data && token &&
        <ScrollView className="z-0" >
          <AppBadge classname={"my-2 flex flex-row justify-between items-center"} >
            <View className="flex flex-row items-center" >
              <View className="relative w-24 h-24 justify-center items-center ">
                <Image
                  className="rounded-xl"
                  width={80}
                  height={80}
                  source={data?.profilPic == "" ? require('../assets/img/noProfilPic.jpg') : { uri: data.profilPic }} />
              </View>
              <View className='ml-2  flex justify-between' >
                <AppText className="capitalize text-xl ml-1">
                  {data.name}
                </AppText>
                <AppText className="capitalize  ml-1">
                  {data.service?.serviceName}
                </AppText>
                <View className='flex flex-row mt-2'>
                  <MaterialCommunityIcons name="google-maps" size={20} color={darkMode ? "white" : "black"} />
                  <AppText className="capitalize ">Tunisia, {data?.location?.cityName}</AppText>
                </View>
              </View>

            </View>
            <AppButton classname={"w-24"} onPress={removeValue}  >logout</AppButton>
          </AppBadge>

          <UserDetailsUpdate data={data} />
          <ServiceUpdate data={data} />

        </ScrollView>
      }
    </View>
  );
};

export default ProfilScreen;
