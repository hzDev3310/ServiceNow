import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import AppButton from './AppButton';
import { View } from 'react-native-animatable';
import { ActivityIndicator } from 'react-native';
const AppImagePicker = ({ setSelectedImage }) => {
    const [loading, setIsLoading] = useState(false)
    const pickImageAsync = async () => {
        setIsLoading(true)
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
            } else {
                alert('You did not select any image.');
            }
        } catch (error) {
            console.log(error)
        } finally { () => setIsLoading(false) }

    };
    return (
        <View className="my-1">
            <AppButton classname={"w-36 flex justify-center items-center"} outLine icon={"plus"} onPress={pickImageAsync}>
                {loading ? <ActivityIndicator color={"white"} /> : "uploade"}
            </AppButton>
        </View>
    )
}

export default AppImagePicker
