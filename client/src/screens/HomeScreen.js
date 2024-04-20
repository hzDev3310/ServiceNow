import useGet from "../apis/useGet";
import { AppActivityIndicator, AppService } from "../componenet";
import { View, FlatList, ActivityIndicator } from "react-native";



const HomeScreen = () => {
  const { data, error, isLoading } = useGet("/users/0/0/all");
  return (
    <View className="flex flex-1 ">

      {isLoading &&  <AppActivityIndicator />}
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
