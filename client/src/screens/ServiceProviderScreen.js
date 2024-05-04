import { useEffect } from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { AppActivityIndicator, AppBadge, AppButton, AppSeparator, AppText, Availability, CallButton, AppComments } from "../componenet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isServiceAvailableToday } from "../verficationInputs";
import { useCurrentUser, useIsLogin } from "../store";
import colors from "../colors";
import usePost from "../apis/usePost";
import InteractiveStarRating from "../componenet/InteractiveStarRating";
const ServiceProviderScreen = ({ navigation, route }) => {
  const provider = route.params.data;
  const providerId = route.params.providerId;
  const { isLogin } = useIsLogin()
  const { currentUser } = useCurrentUser()
  const { error, loading, postData, responseData } = usePost()

  const AppAlert = () =>
    Alert.alert('', 'you need to login ', [
        {
            text: 'cancel',
            style: 'cancel',
        },
        { text: 'ok', onPress: ()=>{navigation.navigate('auth')} },
    ]);

  const handelPost = () => {
    if (!isLogin) {
      AppAlert()
      
    }else{
      postData("/conversation", { users: [currentUser?.userId, providerId] })
    }

  }

  useEffect(() => {
    responseData?.message && navigation.navigate('chats')
    responseData?.convId && navigation.navigate("chats", {
      screen: "chat", params: {
        convId: responseData?.convId, currentUser: currentUser?.userId, otherUser: providerId, otherUserDetails: {
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
        <View className={`p-2 h-28 flex flex-row items-center justify-between`}>

          <View className="flex flex-row h-full items-center " >
            <View className=" flex p-2 items-center">
              <TouchableOpacity onPress={() => { navigation.navigate('image', { image: provider.profilPic }) }} className="border-2 border-blue-600 rounded-lg overflow-hidden">
                <Image source={provider.profilPic ? { uri: provider.profilPic } : require('../assets/img/noProfilPic.jpg')} style={{width : 80 , height : 80}} />
              </TouchableOpacity>
            </View>
            <View>
              <AppText className="font-bold text-lg capitalize text-blue-700 ">
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
            providerId !== currentUser?.userId &&
            <View className="flex justify-around items-end h-full" >
              <AppButton outLine classname={"w-20"} onPress={() => {
                !isLogin ? AppAlert() : navigation.navigate('report', { providerId: providerId })
              }}  >report</AppButton>
              <View className="flex w-20 flex-row justify-between items-center" >
                <TouchableOpacity
                  onPress={handelPost}
                  className=" w-8 h-8 flex justify-center items-center rounded-full" style={ { backgroundColor: colors.primary } } >
                  <MaterialCommunityIcons name="chat-processing-outline" color={"white"} size={24} />
                </TouchableOpacity>
                <CallButton disabled={!isServiceAvailableToday(provider.availability.isAvailable, provider.availability.days)} phoneNumber={provider.phoneNumber} />
              </View>
            </View>
          }
        </View>
        <View className="px-2">
          <AppBadge className="flex my-2 p-4 rounded-xl">
            <AppText className=" font-medium mb-2 ml-6" >Days of work : </AppText>
            <View className="w-full flex items-center">
              <Availability days={provider.availability.days} />
            </View>
          </AppBadge>
          <AppBadge classname={"p-4 mb-2 rounded-xl "}>
            <AppText className="font-medium" >
              {
                (provider.experience === 0 || provider.experience ===null)? "Less then one year" : `${provider.experience} years of exprirence`
              }
            </AppText>

            {provider.description &&
              <>
                <View className="my-1" >
                  <AppSeparator />
                </View>
                <AppText className="font-medium">
                  Description :
                </AppText>
                <AppText >
                  {provider.description}
                </AppText>
              </>
            }
          </AppBadge>
          <InteractiveStarRating
            total={provider.rating.numberOfUsers}
            userId={providerId}
            serviceRating={provider.rating.average} />

        <AppComments data={provider.comments}  providerId={providerId} />
        </View>

       

      </ScrollView>
    );
};

export default ServiceProviderScreen;
