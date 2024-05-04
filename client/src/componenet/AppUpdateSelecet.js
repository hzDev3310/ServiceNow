import { Alert, View } from "react-native"
import { useEffect, useState } from "react"
import AppPicker from "./AppPicker"
import AppButton from "./AppButton"
import useUpdate from "../apis/useUpdate"

const AppUpdateSelecet = ({ user, attribute ,label ,data }) => {
    const { error, isLoading, responseData, updateData } = useUpdate()
    const [value, changeLocation] = useState({})
    useEffect(() => {
        changeLocation(value);
    }, [value])

    const handelUpdate = () => {
        updateData(`/users/${user}/${attribute}`, { value })
    }


    useEffect(()=>{
        error&& alert("check your internet connexion")
        responseData && alert(label +" updated succesfuly")
    },[responseData ,error])
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
                data={data}
            />

            <View className="w-full flex justify-center items-center" >
                <AppButton  onPress={AppAlert}  >
                    update
                </AppButton>
            </View>

        </View>
    )
}

export default AppUpdateSelecet
