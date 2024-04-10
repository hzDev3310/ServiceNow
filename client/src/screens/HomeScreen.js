import useGet from "../apis/useGet";
import { AppService, AppText } from "../componenet";
import { View, FlatList, ActivityIndicator } from "react-native";
import useLocation from "../hooks/useLocation";


const HomeScreen = () => {


  const { data, error, loading } = useGet("/users/0/0/all");
  const { getLocation,currentLocation } = useLocation();
  useFocusEffect(()=>{
    getLocation
  })

  return (
    <View className="flex flex-1 ">
      <AppText>{JSON.stringify(currentLocation)}</AppText>
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
