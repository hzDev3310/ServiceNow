import React from 'react'
import { Image, View } from 'react-native'


const ViewImageScreen = ({navigation , route}) => {
const {image} = route.params
  
  return (
   <View className="flex justify-center items-center flex-1">
    <Image style={{ width: "100%", height: undefined, aspectRatio: 1 }} source={image ? {uri: image} : require('../assets/img/noProfilPic.jpg')} />
   </View>
  )
}

export default ViewImageScreen
