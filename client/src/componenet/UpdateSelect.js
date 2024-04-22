import React, { useEffect, useState } from 'react'
import { useDarkMode } from '../store';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useUpdate from '../apis/useUpdate';
import AppButton from "./AppButton"
import AppText from './AppText';
import UpdateButton from './UpdateButton';
import AppSeparator from './AppSeparator';

import AppPicker from './AppPicker';

const UpdateSelect = ({ userId ,data , label,attribute,icon}) => {
    const [value, setValue] = useState(null)
    const { darkMode } = useDarkMode()
    const [showInput, setShowInput] = useState(true)
    const { error, responseData, updateData } = useUpdate();
    const handleUpdate = async () => {
        await updateData(`/users/${userId}/${attribute}`, { value })
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
                        <MaterialCommunityIcons name={icon} size={20} color={darkMode ? "white" : "black"} />
                        <AppText className="font-bold capitalize ml-2">{label}</AppText>
                    </View>
                    <UpdateButton icon={!showInput ? "chevron-down" : "chevron-right"} onPress={() => setShowInput(!showInput)} />
                </View>

                <View className={showInput && "hidden"} >
                    <AppPicker selectedValue={value} onValueChange={setValue} data={data} />
                    <AppButton outLine onPress={handleUpdate}  >{label}</AppButton>
                </View>
                <View className="mt-1">
                    <AppSeparator />
                </View>
            </View>
        </>
    )
}

export default UpdateSelect
