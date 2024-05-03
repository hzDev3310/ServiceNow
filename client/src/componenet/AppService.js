import { View, Image, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import CallButton from "./CallButton";
import AppText from "./AppText";
import AppBadge from "./AppBadge";
import { isServiceAvailableToday } from "../verficationInputs";
import colors from "../colors";
import { useDarkMode } from "../store";
import Availability from "./Availability";
import StarRating from "./StarRating";

const AppService = ({ provider }) => {
  const { darkMode } = useDarkMode()
  const data = provider.service;
  const providerId = provider._id
  const navigation = useNavigation();

  return (
    <AppBadge classname={"rounded-xl p-2 mb-2 h-28 flex flex-row justify-between items-center"} >
      <TouchableOpacity style={{ width: "80%" }} className="flex flex-row" onPress={()=>{navigation.navigate("provider",{data , providerId})}} >
        <View className="flex justify-center items-center w-24 h-24 bg-slate-600 rounded-xl overflow-hidden" >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={data.profilPic ? { uri: data.profilPic } : require("../assets/img/noProfilPic.jpg")}
          />
        </View>
        <View className="ml-2" >
          <Text style={{ color: colors.primary }} className="text-lg font-semibold capitalize" >{data.serviceName}</Text>
          <View className="mb-1 w-20" >
          <StarRating  rating={data.rating.average} size={18} />
          </View>
          <View className={"flex flex-row"} >
            <MaterialCommunityIcons name="map-marker" color={darkMode ? "white" : "black"} size={20} />
            <AppText>Tunisa, {data.location.cityName}</AppText>
          </View>
        </View>
      </TouchableOpacity>
      <View className="h-full flex justify-between items-end" >
        <View>
      
        </View>
        <CallButton
          phoneNumber={data.phoneNumber}
          disabled={!isServiceAvailableToday(data.availability.isAvailable, data.availability.days)}
        />
      </View>
    </AppBadge>
  );
};

export default AppService;
