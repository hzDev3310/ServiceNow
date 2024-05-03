import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { AppActivityIndicator, AppBadge, AppButton, AppText, Availability, CallButton, StarRating } from "../componenet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../colors";
import { isServiceAvailableToday } from "../verficationInputs";
import { useCurrentUser, useIsLogin } from "../store";
import usePost from "../apis/usePost";
import { useEffect } from "react";
const ServiceProviderScreen = ({ navigation, route }) => {
  const provider = route.params.provider.service;
  const providerId = route.params.providerId;
  const { isLogin } = useIsLogin()
  const { currentUser } = useCurrentUser()
  const { error, loading, postData, responseData } = usePost()

  const handelPost = () => {
    postData("/conversation", { users: [currentUser.userId, providerId] })

  }

  useEffect(() => {
    responseData?.message && navigation.navigate('chats')
    responseData?.convId && navigation.navigate("chats", {
      screen: "chat", params: {
        convId: responseData?.convId, currentUser: currentUser.userId, otherUser: providerId, otherUserDetails: {
          pic: provider.profilPic,
          name: provider.ProviderName
        }
      }
    });

  }, [responseData])

  useEffect(() => {
    responseData?.message && alert(responseData.message)
  }, [responseData])
  if (loading) {
    return <AppActivityIndicator />
  } else
    return (
      <ScrollView>
        <AppBadge classname={`p-2 h-28 flex flex-row items-center justify-between`}>

          <View className="flex flex-row h-full items-center " >
            <View className=" flex p-2 items-center">
              <TouchableOpacity onPress={() => { navigation.navigate('image', { image: route.params.img }) }} className="border-2 border-blue-600 rounded-lg overflow-hidden">
                <Image source={{ uri: route.params.img }} width={80} height={80} />
              </TouchableOpacity>
            </View>
            <View>
              <AppText className="font-bold text-lg capitalize text-blue-700 ${}">
                {provider.serviceName}{" "}
              </AppText>
              <AppText className="font-bold  capitalize">
                {provider.ProviderName}{" "}
              </AppText>
              <AppText className="font-bold  capitalize">
                {provider.location.cityName}{" "}
              </AppText>

            </View>
          </View>
          {
            providerId !== currentUser.userId &&
            <View className="flex justify-around items-end h-full" >
              <AppButton outLine classname={"w-20"} onPress={() => navigation.navigate('report', { providerId: providerId })}  >report</AppButton>
              <View className="flex w-20 flex-row justify-between items-center" >
                <TouchableOpacity
                  disabled={!isLogin}
                  onPress={handelPost}
                  className=" w-8 h-8 flex justify-center items-center rounded-full" style={isLogin ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondary }} >
                  <MaterialCommunityIcons name="chat-processing-outline" color={"white"} size={24} />
                </TouchableOpacity>
                <CallButton disabled={!isServiceAvailableToday(provider.availability.isAvailable, provider.availability.days)} phoneNumber={provider.phoneNumber} />
              </View>
            </View>
          }
        </AppBadge>
        <AppBadge className="flex mt-2 p-4  ">
          <AppText className=" font-medium mb-2 ml-8" >Days of work : </AppText>
          <View className="w-full flex items-center">
            <Availability days={provider.availability.days} />
          </View>
        </AppBadge>
        <AppBadge classname={"p-4 mt-2 "}>
          <AppText className="font-medium" >
            {
              provider.experience === 0 ? "less then one year" : `${provider.experience} years of exprirence`
            }
          </AppText>
          {provider.description &&
            <>
              <AppText className="font-medium">
                Description :
              </AppText>
              <AppText >
                {provider.description}
              </AppText>
            </>
          }
        </AppBadge>

        <View className="w-full flex p-1  items-center">
          <StarRating />
        </View>
      </ScrollView>
    );
};

export default ServiceProviderScreen;
