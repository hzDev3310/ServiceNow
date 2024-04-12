import useGet from "../apis/useGet";
import { AppService, AppText } from "../componenet";
import { View, FlatList, ActivityIndicator } from "react-native";
import useLocation from "../hooks/useLocation";
import { useFocusEffect } from "@react-navigation/native";


const HomeScreen = () => {


  const { data, error, isLoading } = useGet("/users/0/0/all");
  const { getLocation,currentLocation } = useLocation();
  useFocusEffect(()=>{
    getLocation
  })

  return (
    <View className="flex flex-1 ">
      <AppText>{JSON.stringify({currentLocation,error,isLoading})}</AppText>
      {isLoading && <ActivityIndicator />}
      {error && alert(JSON.stringify(error))}

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
