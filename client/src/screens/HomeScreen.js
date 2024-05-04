import useGet from "../apis/useGet";
import { AppActivityIndicator, AppInput, AppPicker, AppService, AppText } from "../componenet";
import { View, FlatList, Text } from "react-native";
import useLocation from "../hooks/useLocation";
import { useEffect, useState } from "react";
import colors from "../colors";
import { locations } from "../storage";
import AppLoadingCard from "../componenet/AppLoadingCard";
import useServices from "../hooks/useServices";

const HomeScreen = () => {
  const { getLocation, currentLocation } = useLocation();
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState(currentLocation);
  const [url, setUrl] = useState(`/serivces/${selectedValue.latitude}/${selectedValue.longitude}`)
  const { data, error, isLoading } = useServices(url);
  const [services, setServices] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (data) {
      setServices(data);
    }
  }, [data]);

  useEffect(() => {
    setUrl(`/serivces/${selectedValue.latitude}/${selectedValue.longitude}`)
  }, [selectedValue])

  useEffect(() => {
    if (search) {
      const searchData = services.filter(service =>
        service.service?.serviceName.toLowerCase().includes(search.toLowerCase())
      );
      if (searchData.length > 0) {
        setServices(searchData);
      }
    } else {
      setServices(data);
    }
  }, [data, search]);

  return (
    <View className="flex flex-1 items-center">

      <View className="w-full flex justify-center items-end ">
        <View className="w-full px-2 flex items-center ">
          <AppInput
            containerStyle={{ borderWidth: 2, borderColor: colors.primary }}
            disableRightIcon={false}
            rightIcon={"account-search"}
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
        </View>
        <View className="w-1/2 px-2 h-12 flex justify-center ">
          <AppPicker
            data={locations}
            selectedValue={selectedValue}
            onValueChange={v => setSelectedValue(v)}
            label={selectedValue.cityName} />
        </View>
      </View>
      {isLoading && <AppLoadingCard />}
      {error && (
        <View className="flex flex-1 justify-center">
          <Text className="text-red-600 text-center">Check your internet connection</Text>
        </View>
      )}

      {data && (
        <View className="w-full p-1 mt-1" >
          <FlatList
            data={services}
            renderItem={({ item }) => <AppService provider={item} />}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
