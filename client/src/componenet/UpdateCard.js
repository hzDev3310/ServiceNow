import React, { useEffect, useState } from 'react'
import AppText from './AppText'
import { View } from 'react-native'
import { useDarkMode } from '../store'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AppInput from './AppInput'
import UpdateButton from './UpdateButton'
import AppSeparator from './AppSeparator'
import useUpdate from "../apis/useUpdate"
const UpdateCard = ({ item, keyName, userId, icon, update }) => {
    const { darkMode } = useDarkMode()
    const [showInput, setShowInput] = useState(true)
    const [updatedValue, setValue] = useState('');
    const { error, responseData, updateData } = useUpdate();
    const handleUpdate = async () => {
        await updateData(`/users/${userId}/${update}`, { value: updatedValue })
    }

    useEffect(()=>{
        error && alert(error?.message)
        responseData &&  alert(responseData?.message)
    }, [responseData , error] )
    return (
        <>
            <View className="p-2 m-1 rounded-xl">
                <View className="flex justify-between items-center flex-row">
                    <View className="flex flex-row justify-center items-center  " >
                        <MaterialCommunityIcons name={icon} size={20} color={darkMode ? "white" : "dark"} />
                        <AppText className="font-bold capitalize ml-2">{keyName}</AppText>
                        {item && <AppText className="capitalize" >{" : " + item}</AppText>}
                    </View>
                    <UpdateButton icon={!showInput ? "chevron-down" : "chevron-right"} onPress={() => setShowInput(!showInput)} />
                </View>
                <View className={showInput && "hidden"} >

                    <AppInput
                        value={updatedValue}
                        onChangeText={e => { setValue(e) }}
                        placeholder={"change your " + keyName}
                        rightIcon={"send"}
                        onpress={handleUpdate}
                    />
                    <AppText>

                    </AppText>
                </View>
                <View className="mt-1">
                    <AppSeparator />
                </View>
            </View>
        </>
    )
}

export default UpdateCard
