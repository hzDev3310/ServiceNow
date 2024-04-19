import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import AppButton from './AppButton';
import { View } from 'react-native-animatable';
const AppImagePicker = ({ selectedImage, setSelectedImage }) => {

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [4, 4]
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };
    return (
        <View className="my-1">
            <AppButton icon={"plus"} onPress={pickImageAsync}>
                select Image
            </AppButton>
        </View>
    )
}

export default AppImagePicker
