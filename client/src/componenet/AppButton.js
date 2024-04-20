import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import colors from '../colors'

const AppButton = ({ classname,children, icon, outLine = false, ...otherProps }) => {
    return (
        <TouchableOpacity
            {...otherProps}
            className={`flex flex-row  w-full border-2  justify-center items-center rounded-full ${classname}`} 
            style={[
                !outLine && { backgroundColor: colors.primary },
                otherProps.disabled ? { borderColor: colors.secondary } : { borderColor: colors.primary },
                otherProps.disabled && { backgroundColor: colors.secondary }
            ]}>
            <MaterialCommunityIcons name={icon} color={!outLine || otherProps.disabled ? colors.white : colors.primary} size={25} style={{ marginRight: 4 }} />
            <Text style={[
                outLine ? { color: colors.primary } : { color: colors.white },
                otherProps.disabled && { color: colors.white }
            ]} className={"text-base font-medium capitalize"} >
                {children}
            </Text>
        </TouchableOpacity>
    )
}

export default AppButton
