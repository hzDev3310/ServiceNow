import { AppInput, AppPicker, AppService, AppLoadingCard } from "../componenet";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { locations } from "../storage";
import { useEffect, useState } from "react";
import useLocation from "../hooks/useLocation";
import colors from "../colors";
import useServices from "../hooks/useServices";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const { getLocation, currentLocation } = useLocation();
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState(currentLocation);
  const [url, setUrl] = useState(`/serivces/${selectedValue.latitude}/${selectedValue.longitude}`)
  const { data, error, isLoading } = useServices(url);
  const [services, setServices] = useState([]);
  const [show, setShow] = useState(false);



  useEffect(() => {
    getLocation();
   
  }, [currentLocation]);

  useEffect(() => {
    if (data) {
      setServices(data);
    }
  }, [data]);

  useEffect(() => {
    setUrl(`/serivces/${selectedValue.latitude}/${selectedValue.longitude}`)
    setShow(false)
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
        <View className="w-full px-2 flex items-center flex-row  justify-between ">
          <View style={{width : "85%"}}>
            <AppInput
            
              containerStyle={{ borderWidth: 2, borderColor: colors.primary }}
              disableRightIcon={false}
              rightIcon={"account-search"}
              onChangeText={(text) => setSearch(text)}
              value={search}
            />
          </View>
          <TouchableOpacity 
          style={{ backgroundColor: colors.primary  }} 
          className="p-1 rounded-full flex justify-center items-center "
          onPress={()=>{setShow(prv=>!prv)}}
          >
            <MaterialCommunityIcons name="map-marker" color={"white"} size={30} />
          </TouchableOpacity>
        </View>
        <View className={`w-full px-2 h-12 flex justify-center ${!show&& "hidden"}`}>
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
        <View className="w-full flex-1 p-1 mt-1" >
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
