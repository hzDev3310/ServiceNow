import { TouchableOpacity, View } from "react-native"
import AppText from "./AppText"
import AppSeparator from "./AppSeparator"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from "react"

const AppUpdateModel = ({ children, label, nav }) => {
    const [show, setShow] = useState(false)
    return (
        <View className="p-2">
            <View className="flex flex-row justify-between items-center">
                <AppText className="text-base capitalize" >
                    {label}
                </AppText>
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
