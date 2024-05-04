import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import AppText from './AppText'
import TimeElapsedComponent from './TimeElapsedComponent'
import { useNavigation } from '@react-navigation/native'
import { useGet } from '../apis'
const AppCommentCard = ({ comment }) => {
    const navigation = useNavigation()
    const { data } = useGet("/users/" + comment?.sender)
    return (
        <View className="w-full" >
            <View className=" mb-2 w-full flex-row justify-between items-center " >
                <View className="flex flex-row  justify-center items-center">
                    <TouchableOpacity onPress={() => { navigation.navigate('image', { image: comment?.profilPic }) }} className="rounded-full overflow-hidden">
                        <Image source={data?.pic ? { uri: data?.pic } : require('../assets/img/noProfilPic.jpg')} style={{ width: 45, height: 45 }} />
                    </TouchableOpacity>

                    <View style={{ marginLeft: 6 }} >
                        <AppText className="font-semibold text-base" >
                            {data?.name}
                        </AppText>
                        <AppText >{comment?.content}</AppText>
                    </View>
                </View>
                <View className="h-full" >
                    <AppText  >
                        <TimeElapsedComponent timestamp={comment?.createdAt} ></TimeElapsedComponent>
                    </AppText>
                </View>

            </View>

        </View>
    )
}

export default AppCommentCard
