import React from 'react'
import { useCurrentUser } from '../store'
import AppButton from './AppButton'
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Image, View } from 'react-native';
import AppText from './AppText';
import useGet from '../apis/useGet';
const AppAuth = () => {
    const navigation = useNavigation()
    const { currentUser } = useCurrentUser()
    const { data, isLoading } = useGet('/users/' + currentUser?.userId, [currentUser])
    if (currentUser) {
        return (
            <View className="mr-3 flex justify-center items-center overflow-hidden rounded-xl">
                {isLoading && <ActivityIndicator />}
                <Image
                    style={{ width: 40, height: 40 }}
                    source={data?.pic ? { uri: data.pic } : require("../assets/img/noProfilPic.jpg")}
                />
            </View>
        )
    } else return (<AppButton classname={"w-10 h-10 mr-3 rounded-lg"} icon={"login"} onPress={() => { navigation.navigate('auth') }} />)
}

export default AppAuth
