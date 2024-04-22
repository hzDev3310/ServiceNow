import React, { useEffect, useState } from 'react'
import UpdateButton from './UpdateButton'
import AppText from './AppText'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ActivityIndicator, Image, View } from 'react-native'
import AppSeparator from './AppSeparator'
import AppImagePicker from './AppImagePicker'
import AppButton from './AppButton'
import useImage from "../hooks/useImage"
import { useDarkMode } from '../store'
const UploadImage = ({ keyName, userId, attribute }) => {
    const [showInput, setShowInput] = useState(true)
    const { darkMode } = useDarkMode()
    const [img, setImg] = useState(null)
    const { error, loading, postImg, responseData } = useImage(img, userId, attribute)
    useEffect(() => {
        error && alert("checkyour internt connection")
        responseData && alert("photo update succsefuly")
    }, [responseData])

    return (

        <View className="p-2 m-1 rounded-xl">
            <View className="flex justify-between items-center flex-row">
                <View className="flex flex-row justify-center items-center  " >
                    <MaterialCommunityIcons name={"image-edit"} size={20} color={darkMode ? "white" : "black"} />
                    <AppText className="font-bold capitalize ml-2">change your {keyName}</AppText>
                </View>
                <UpdateButton icon={!showInput ? "chevron-down" : "chevron-right"} onPress={() => setShowInput(!showInput)} />
            </View>

            <View className={showInput && "hidden"} >

                <AppImagePicker selectedImage={img} setSelectedImage={setImg} />
                {img &&
                    <View className="w-full flex flex-row justify-center items-center">
                        {loading && <ActivityIndicator />}
                        <View className="w-1/3 rounded-xl overflow-hidden" >
                            <Image style={{width : "100%"}} height={100} source={{ uri: img }} />
                        </View>
                        <View className="w-2/3 pl-1" style={{ height: 100, marginVertical: 2 }} >
                            <AppButton classname={"h-full rounded-xl"} icon={"arrow-up-bold"} onPress={() => {
                                postImg();
                            }} >uploade</AppButton>
                        </View>
                    </View>
                }
            </View>

            <View className="mt-1">
                <AppSeparator />
            </View>
        </View>
    )
}

export default UploadImage
