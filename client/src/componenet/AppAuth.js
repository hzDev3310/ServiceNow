import React from 'react'
import { useCurrentUser, useDarkMode } from '../store'
import AppButton from './AppButton'
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';

import useGet from '../apis/useGet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const AppAuth = () => {
    const { darkMode } = useDarkMode();
    const navigation = useNavigation()
    const { currentUser } = useCurrentUser()
    const { data, isLoading } = useGet('/users/' + currentUser?.userId, [currentUser])
    if (currentUser) {
        return (
            <View className=" w-10 h-10 flex justify-center items-center overflow-hidden rounded-xl">
                {isLoading && <ActivityIndicator />}
                <Image
                    style={{ width: "100%", height: "100%" }}
                    source={data?.pic ? { uri: data.pic } : require("../assets/img/noProfilPic.jpg")}
                />
            </View>
        )
    } else return (

        <TouchableOpacity  onPress={() => { navigation.navigate('auth') }} className="w-10 h-10 justify-center items-center  rounded-xl"
        style={darkMode ?{backgroundColor : colors.primary} : {backgroundColor : colors.secondary}}>
         <MaterialCommunityIcons name="login"  color={darkMode ? "white" :"black"}  size={30} />
       </TouchableOpacity>
     
    )
}

export default AppAuth
