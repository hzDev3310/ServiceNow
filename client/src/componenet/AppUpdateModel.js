import { TouchableOpacity, View } from "react-native"
import AppText from "./AppText"
import AppSeparator from "./AppSeparator"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from "react"
import { useDarkMode } from "../store"

const AppUpdateModel = ({ children, label, nav , icon }) => {
    const {darkMode} = useDarkMode()
    const [show, setShow] = useState(false)
    return (
        <View className="p-2">
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center">
                    <MaterialCommunityIcons color={darkMode ? "white" : "black"} name={icon} size={20} />
                    <AppText className="text-base capitalize ml-1" >
                        {label}
                    </AppText>
                </View>
                {nav ?
                    <TouchableOpacity onPress={nav} >
                        <MaterialCommunityIcons color="gray" name={show ? "window-close" : "lead-pencil"} size={20} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => { setShow(prv => !prv) }} >
                        <MaterialCommunityIcons color="gray" name={show ? "window-close" : "lead-pencil"} size={20} />
                    </TouchableOpacity>
                }
            </View>

            <View className={!show ? "hidden" : "my-2"} >
                {children}
            </View>
            <View className="my-2" ><AppSeparator /></View>
        </View>
    )
}

export default AppUpdateModel
