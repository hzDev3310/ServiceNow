import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, ScrollView } from 'react-native'
import { AppActivityIndicator, AppBadge, AppButton, AppInput, AppSeparator } from '../componenet'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { VerifyPassword, verifyInputs, verifyName, verifyPhoneNumber } from "../verficationInputs"
import colors from '../colors'
import useLocation from '../hooks/useLocation'
import usePost from '../apis/usePost'

const RegisterScreen = ({ navigation }) => {
  const { currentLocation } = useLocation();
  const { loading, error, responseData, postData } = usePost()

  const [body, setBody] = useState({
    number: "",
    password: "",
    name: "",
    location: currentLocation
  })
  useEffect(() => {
    error && alert("check your internt connection")
    responseData?.message === "account created successfully" && navigation.navigate('login')
    responseData && alert(responseData.message)
  }, [responseData, error])

  const handelSignUp = () => {

    if (verifyPhoneNumber(body.number) && VerifyPassword(body.password) && VerifyPassword(body.name)) {
      postData('/auth/signup', body)

    }


  }
  if (loading) {
    { loading && <AppActivityIndicator /> }
  } else
    return (
      <View style={{ backgroundColor: colors.primary }} className="flex-1 w-full" >
        <View className="h-1/4 flex justify-center w-full items-center" >
          <View style={{ borderColor: colors.secondary }} className="h-40 w-40 rounded-full flex justify-center items-center border-4 bg-white">
            <MaterialCommunityIcons name='account' size={80} color={colors.primary} />
            <View className="absolute right-4 w-12 flex justify-center items-center aspect-square bottom-10  bg-white rounded-full overflow-hidden" >
              <Text className="text-6xl" style={{ color: colors.primary }} >+</Text>
            </View>
            <Text style={{ color: colors.primary }} className="text-xl font-medium" >Sign Up</Text>
          </View>
        </View>
        <AppBadge className="h-3/4 w-full rounded-t-3xl flex justify-center items-center p-2" >
          <Text style={{ color: colors.primary }} className="font-bold text-3xl m-4 capitalize text-center" >create New account</Text>
            <AppInput
              iconName={"account"}
              label={"Name"}
              placeholder='Enter your full name'
              value={body.name}
              error={!verifyName(body.name)}
              errorMessage="Name should be at least 3 characters long and contain only alphabetic characters"
              onChangeText={(text) => setBody(prevState => ({ ...prevState, name: text }))}
            />
        
          <AppInput
            keyboardType='numeric'
            iconName={"phone"}
            label={"Phone Number"}
            placeholder='Enter your phone number'
            value={body.number}
            error={!verifyPhoneNumber(body.number)}
            errorMessage="Please enter a valid phone number"
            onChangeText={(text) => setBody(prevState => ({ ...prevState, number: text }))}
          />

          <AppInput
            iconName={"key"}
            label={"Password"}
            placeholder='Enter your password'
            password
            value={body.password}
            error={!VerifyPassword(body.password)}
            errorMessage="Password should be at least 6 characters long"
            onChangeText={(text) => setBody(prevState => ({ ...prevState, password: text }))}
          />

          <View className="w-full p-2">
            <AppButton
              disabled={!verifyInputs([body.name, body.number, body.password])}
              icon={"account-plus"}
              error={error && true} message={error ? error.message : 'login sussefuly'}
              onPress={handelSignUp} >sign up</AppButton>
          </View>
          <View style={{ width: '80%' }} >
            <AppSeparator text="or" />
          </View>
          <View className="w-full p-2">
            <AppButton icon={"login"} onPress={() => {  navigation.navigate('login') }} outLine >login</AppButton>
          </View>

        </AppBadge>
      </View>
    )
}

export default RegisterScreen