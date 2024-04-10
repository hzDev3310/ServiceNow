import React, { useState } from 'react'
import { View, Text, StatusBar, ScrollView } from 'react-native'
import { AppActivityIndicator, AppAlert, AppBadge, AppButton, AppInput, AppSeparator, AppText } from '../componenet'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { VerifyPassword, verifyInputs, verifyPhoneNumber } from "../verficationInputs"
import colors from '../colors'
import useLocation from '../hooks/useLocation'
import usePost from '../apis/usePost'

const RegisterScreen = ({ navigation }) => {
  const { currentLocation } = useLocation();
  const { loading, error, responseData, postData } = usePost()
  const [alert, setAlert] = useState(false)
  const [body, setBody] = useState({
    number: "",
    password: "",
    name: "",
    Location: currentLocation
  })

  const handelSignUp = () => {

    if (verifyPhoneNumber(body.number) && VerifyPassword(body.password) && VerifyPassword(body.name)) {
      postData('/auth/signup', body)
      error || responseData &&  setAlert(true)
    }
  }
  return (
    <View style={{ backgroundColor: colors.primary }} className="flex-1" >
      {loading && <AppActivityIndicator />}
      <StatusBar backgroundColor={colors.primary} />
      <View className="h-1/4 flex justify-center items-center" >

        <View style={{ borderColor: colors.secondary }} className="h-40 w-40 rounded-full flex justify-center items-center border-4 bg-white">
          <MaterialCommunityIcons name='account' size={100} color={colors.primary} />
          <View className="absolute right-4 w-12 flex justify-center items-center aspect-square bottom-10  bg-white rounded-full overflow-hidden" >
            <Text className="text-6xl" style={{ color: colors.primary }} >+</Text>
          </View>
          <Text style={{ color: colors.primary }} className="text-xl font-medium" >Sign Up</Text>
        </View>
      </View>
      <AppBadge className="h-3/4 rounded-t-3xl flex justify-center items-center p-2" >
        <Text style={{ color: colors.primary }} className="font-bold text-3xl m-4 capitalize text-center" >create New account</Text>
        <ScrollView showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}>
          <AppInput iconName={"account"} label={"name"} placeholder='full name' value={body.name}
            error={!VerifyPassword(body.name)}
            errorMessage="name at list 6 caractert"
            onChangeText={
              (text) => setBody(prevState => ({
                ...prevState,
                name: text
              }))} />
          <AppInput keyboardType='numeric' iconName={"phone"} label={"phone number"} value={body.number}
            error={!verifyPhoneNumber(body.number)}
            errorMessage="inter a valide phone number"
            onChangeText={
              (text) => setBody(prevState => ({
                ...prevState,
                number: text
              }))} />
          <AppInput iconName={"key"} label={"password"} password value={body.password}
            error={!VerifyPassword(body.password)}
            errorMessage="name at list 6 caractert"
            onChangeText={
              (text) => setBody(prevState => ({
                ...prevState,
                password: text
              }))}
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
            <AppButton icon={"login"} onPress={() => { navigation.navigate('login') }} outLine >login</AppButton>
          </View>
          <AppAlert error={error && true} message={error ? error.message : 'sign up sussefuly'} onClose={() => setAlert(false)} visible={alert} />
        </ScrollView>
      </AppBadge>
    </View>
  )
}

export default RegisterScreen