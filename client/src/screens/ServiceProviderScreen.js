import { Image, ScrollView, View } from "react-native";
import { AppBadge, AppText, Availability, StarRating } from "../componenet";

const ServiceProviderScreen = ({ navigation, route }) => {
  const provider = route.params.provider.service;
  return (
    <ScrollView>
      <View className="w-full flex p-2 items-center">
        <View className="border-2 border-blue-600 rounded-lg overflow-hidden">
          <Image source={{ uri: route.params.img }} width={200} height={200} />
        </View>
      </View>

      <AppBadge classname={`p-4 m-2 rounded-2xl`}>
        <AppText className="font-bold text-4xl capitalize text-blue-700 ${}">
          {provider.serviceName}{" "}
        </AppText>
        <AppText className="font-bold text-2xl capitalize">
          Name : {provider.ProviderName}{" "}
        </AppText>
        <AppText className="font-bold text-2xl capitalize">
          location : {provider.location.cityName}{" "}
        </AppText>
        <AppText className="font-bold text-2xl capitalize">
          experience : {provider.experience} years{" "}
        </AppText>
        
      </AppBadge>
      <AppBadge className="flex p-4 m-2 rounded-2xl items-center">
        <Availability />
        </AppBadge>
      <View className="w-full flex p-1  items-center">
        <StarRating />
      </View>
    </ScrollView>
  );
};

export default ServiceProviderScreen;
