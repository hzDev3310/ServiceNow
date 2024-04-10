import useGet from "../apis/useGet";
import { AppService, AppText } from "../componenet";
import { View, FlatList, ActivityIndicator, Button } from "react-native";
import useLocation from "../hooks/useLocation";
import useToken from "../hooks/useToken";
import { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {


  const { data, error, loading } = useGet("/users/0/0/all");
  const { getLocation,currentLocation } = useLocation();
  useFocusEffect(()=>{
    getLocation
  })

  return (
    <View className="flex flex-1 ">
      <Text>{JSON.stringify(currentLocation)}</Text>
      {loading && <ActivityIndicator />}
      {error && alert(JSON.stringify(error))}
      {data?.message && alert("connection error message")}
      {data && (
        <FlatList
          data={data}
          renderItem={({ item }) => <AppService provider={item} />}
        />
      )}

    </View>
  );
};

export default HomeScreen;
