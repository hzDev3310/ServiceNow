import React, { useEffect, useState } from 'react'
import { useDarkMode } from '../store';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useUpdate from '../apis/useUpdate';
import AppButton from "./AppButton"
import AppText from './AppText';
import UpdateButton from './UpdateButton';
import AppSeparator from './AppSeparator';
import locations from '../locations'
import AppPicker from './AppPicker';

const UpdateLocations = ({ userId, currentLocation }) => {
    const [newLocation, setNewLocation] = useState(currentLocation)
    const { darkMode } = useDarkMode()
    const [showInput, setShowInput] = useState(true)
    const { error, responseData, updateData } = useUpdate();
    const handleUpdate = async () => {
        await updateData(`/users/${userId}/location`, { value: newLocation })
    }

    useEffect(() => {
        error && alert(error?.message)
        responseData && alert(responseData?.message)
    }, [responseData, error])
    return (
        <>
            <View className="p-2 m-1 rounded-xl">
                <View className="flex justify-between items-center flex-row">
                    <View className="flex flex-row justify-center items-center  " >
                        <MaterialCommunityIcons name={"map-marker"} size={20} color={darkMode ? "white" : "dark"} />
                        <AppText className="font-bold capitalize ml-2">change location</AppText>
                    </View>
                    <UpdateButton icon={!showInput ? "chevron-down" : "chevron-right"} onPress={() => setShowInput(!showInput)} />
                </View>

                <View className={showInput && "hidden"} >
                    <AppPicker selectedValue={newLocation} onValueChange={setNewLocation} data={locations} />
                    <AppButton outLine onPress={handleUpdate}  >change your location</AppButton>
                </View>
                <View className="mt-1">
                    <AppSeparator />
                </View>
            </View>
        </>
    )
}

export default UpdateLocations
