import { Alert, View } from "react-native"
import AppText from "./AppText"
import { useCurrentLocation } from "../store"
import { useEffect, useState } from "react"
import AppPicker from "./AppPicker"
import { locations } from "../storage"
import AppButton from "./AppButton"
import useUpdate from "../apis/useUpdate"

const AppUpdateSelecet = ({ user, attribute ,label }) => {
    const { error, isLoading, responseData, updateData } = useUpdate()
    const [value, changeLocation] = useState({})
    useEffect(() => {
        changeLocation(value);
    }, [value])

    const handelUpdate = () => {
        updateData(`/users/${user}/${attribute}`, { value })
    }

    const AppAlert = () =>
        Alert.alert('', 'Are you sure! you want to update your ' + label, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Yes', onPress: handelUpdate },
        ]);
    return (
        <View>
            <AppPicker
                selectedValue={value}
                onValueChange={v => changeLocation(v)}
                data={locations}
            />

            <View className="w-full flex justify-center items-center" >
                <AppButton  onPress={AppAlert} classname={"w-28"} >
                    update
                </AppButton>
            </View>

        </View>
    )
}

export default AppUpdateSelecet
