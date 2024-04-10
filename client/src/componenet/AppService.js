import { View, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useDarkMode } from "../store";
import { useNavigation } from "@react-navigation/native";

import CallButton from "./CallButton";
import AppText from "./AppText";
import Availability from "./Availability";

const AppService = ({ provider }) => {
  const { darkMode } = useDarkMode();
  const data = provider.service;
  const navigation = useNavigation();
  const noProfilPic =
    "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
  const img = data.profilPic === "" ? noProfilPic : data?.profilPic;
  return (
    <View
      className={`${darkMode ? "bg-zinc-900" : "bg-white"
        } m-2 p-2 rounded-xl  flex flex-row justify-between items-center shadow-inherit`}
    >
      <TouchableOpacity
        className={"flex - flex-row"}
        onPress={() => navigation.navigate("provider", { provider, img })}
      >
        <View className="flex justify-center items-center p-2">
          <View className="overflow-hidden w-24 h-24 p-2 flex justify-center items-center rounded-lg ">
            <Image
              width={100}
              height={100}
              source={{
                uri: img,
              }}
            />
          </View>

        </View>

        <View className="ml-2 justify-center">
          <AppText className="text-lg" >🤵🏻{data.ProviderName}</AppText>
          <AppText className="text-lg">⚒️ {data.serviceName}</AppText>
          <AppText className="text-lg">➕ experience : {data.experience}</AppText>
          <AppText className="text-lg">📌 location</AppText>
        </View>
      </TouchableOpacity>
      <View className="h-full flex justify-between items-end">
        <View className=" flex flex-row justify-center items-center">
          <AppText className='font-bold text-lg' >{data.rating.average}</AppText>
          <MaterialCommunityIcons
            name={"star"}
            size={25}
            color={"yellow"}
          />
        </View>
        <CallButton phoneNumber={data.phoneNumber} />
      </View>
    </View>
  );
};

export default AppService;
