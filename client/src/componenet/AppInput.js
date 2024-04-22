import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDarkMode } from '../store'
import { useState } from 'react'
import colors from '../colors'

const AppInput = ({ password, iconName, label, error = false, errorMessage ,rightIcon,disableRightIcon , onpress , ...otherProps }) => {
  const [show, setShow] = useState(true)
  const { darkMode } = useDarkMode()
  return (
    <View className="w-full m-1" >
      <View className={` rounded-3xl  flex flex-row w-full p-2 justify-between items-center ${darkMode ? "bg-stone-950" : "bg-gray-200"} `} style={error && {borderWidth : 2 , borderColor : colors.danger}} >
        <View className="flex flex-row items-center " style={{width : "79%"}} >
          {iconName && (
            <MaterialCommunityIcons size={25} color={!darkMode ? "black" : "white"} name={iconName} />
          )}
          <TextInput
            placeholder={label}
            placeholderTextColor={!darkMode ? "#8c8b8b" : "#696868"}
            style={{
              marginLeft: 10,
              width :"100%",
              color: !darkMode ? "black" : "white"
            }}
            
            {...otherProps}
            secureTextEntry={password && show}
          />
        </View>
        {password && (
          <TouchableOpacity onPress={() => { setShow(!show) }}>
            <MaterialCommunityIcons size={25} color={!darkMode ? "black" : "white"} name={show ? 'eye-off' : 'eye'} />
          </TouchableOpacity>
        )}
          {(rightIcon && disableRightIcon== false )&& (
          <TouchableOpacity onPress={onpress }>
            <MaterialCommunityIcons size={25} color={colors.primary} name={rightIcon} />
          </TouchableOpacity>
        )}
      </View>

      {
        error && <View className="flex flex-row px-2 items-center ">
          <MaterialCommunityIcons size={15} color={colors.danger} name="alert-circle" />
          <Text style={{color:colors.danger}} > {errorMessage}</Text>
        </View>
      }
      
    </View>
  )
}

export default AppInput

