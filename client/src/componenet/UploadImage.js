import React, { useEffect, useState } from 'react'

import { ActivityIndicator, Image, View } from 'react-native'

import AppImagePicker from './AppImagePicker'
import AppButton from './AppButton'
import useImage from "../hooks/useImage"

const UploadImage = ({  userId, attribute }) => {
  
    const [img, setImg] = useState(null)
    const { error, loading, postImg, responseData } = useImage(img, userId, attribute)
    useEffect(() => {
        error && alert("checkyour internt connection")
        responseData && alert("photo update succsefuly")
    }, [responseData])

    return (

        <>
            <AppImagePicker selectedImage={img} setSelectedImage={setImg} />
            {img &&
                <View className="w-full flex flex-row justify-center items-center">
                    {loading && <ActivityIndicator />}
                    <View className="w-1/3 rounded-xl overflow-hidden" >
                        <Image style={{ width: "100%" }} height={100} source={{ uri: img }} />
                    </View>
                    <View className="w-2/3 pl-1" style={{ height: 100, marginVertical: 2 }} >
                        <AppButton classname={"h-full rounded-xl"} icon={"arrow-up-bold"} onPress={() => {
                            postImg();
                        }} >uploade</AppButton>
                    </View>
                </View>
            }
        </>
    )
}

export default UploadImage
