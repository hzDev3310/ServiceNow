import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCurrentUser, useDarkMode, useIsLogin } from '../store';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { AppBadge, AppButton, AppText, AppUpdateService, AppUpdateUserCard } from "../componenet";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../colors';
import useProfil from '../hooks/useProfil';
import AppLoadingProfil from '../componenet/AppLoadingProfil';


const ProfilScreen = ({ navigation }) => {
  const { setIsLogin } = useIsLogin()
  const { darkMode } = useDarkMode()
  const { currentUser } = useCurrentUser()
  const { data, error, isLoading } = useProfil(currentUser?.token)



  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsLogin(false)
      console.log('Token removed.');
    } catch (e) {
      console.log('Error occurred while removing token.');
    }
  }

  return (
    <View>
      <StatusBar />
      {error && <View className="flex flex-1 justify-center items-center">
        <Text style={{ color: colors.danger }} >
          check your internt connexion
        </Text>
      </View>}
      {isLoading &&
        <AppLoadingProfil />}
      {
        data &&
        <ScrollView>
          <AppBadge classname={"my-2 flex flex-row justify-between items-center"} >
            <View className="flex flex-row items-center" >
              <TouchableOpacity onPress={() => { navigation.navigate('image', { image: data.profilPic }) }} className="relative w-24 h-24 justify-center items-center">
                <Image
                  className="rounded-xl"
                  style={{ height: 80, width: 80 }}
                  source={data?.profilPic == "" ? require('../assets/img/noProfilPic.jpg') : { uri: data.profilPic }} />
              </TouchableOpacity>
              <View className='ml-2  flex justify-between' >
                <AppText className="capitalize text-xl ml-1">
                  {data.name}
                </AppText>
                <AppText className="capitalize  ml-1">
                  {data.service?.serviceName}
                </AppText>
                <View className='flex flex-row mt-2'>
                  <MaterialCommunityIcons name="google-maps" size={20} color={darkMode ? "white" : "black"} />
                  <AppText className="capitalize ">Tunisia, {data?.location?.cityName}</AppText>
                </View>
              </View>

            </View>

          </AppBadge>
          {
            !data.service && <AppBadge className={"w-full mb-2 px-2 py-4 flex flex-row items-center justify-between"} >
              <AppText className="text-base" style={{ color: colors.primary }} >
                you want to offer a service ?
              </AppText>
              <AppButton classname={"w-28"} onPress={() => { navigation.navigate("offerService") }}  >
                click here
              </AppButton>
            </AppBadge>
          }
          {
            data.service?.certification && !data.isProvider && <AppBadge classname={"w-full mb-2 px-2 py-4 flex flex-row items-center justify-between"} >
              <AppText className="text-base" style={darkMode ? { color: colors.warning } : { color: "rgb(192, 151, 39)" }} >
                Wait for the admin to confirm your verification.
              </AppText>

            </AppBadge>
          }
          {
            data.service && !data.service.certification && <AppBadge classname={"w-full mb-2 px-2 py-4 flex flex-row items-center justify-between"} >
              <AppText className="text-base" style={darkMode ? { color: colors.warning } : { color: "rgb(192, 151, 39)" }}>
                please verify your account !
              </AppText>
              <AppButton classname={"w-28"} onPress={() => navigation.navigate("updateImage", { attribute: "certification", label: "are you sure " })} >
                click here
              </AppButton>
            </AppBadge>
          }

          <AppUpdateUserCard user={data} />
          {
            data.service && <AppUpdateService user={data} />
          }
          <View className="my-2 px-1">
            <AppButton onPress={removeValue}  >logout</AppButton>
          </View>
        </ScrollView>
      }
    </View>
  );
};

export default ProfilScreen;
