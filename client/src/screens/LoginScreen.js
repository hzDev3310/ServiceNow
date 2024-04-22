import { View, Text, ScrollView, StatusBar } from 'react-native'
import { AppBadge, AppButton, AppInput, AppSeparator, AppAlert, AppActivityIndicator, AppText } from '../componenet'
import { VerifyPassword, verifyPhoneNumber, verifyInputs } from '../verficationInputs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import colors from '../colors'

import useLogin from '../hooks/useLogin'



const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const { loading, error, login, responseData } = useLogin()



  useEffect(() => {
    error && !error.message && alert(error)
    error?.message && alert(error.message)
    responseData?.token && navigation.goBack();
  }, [responseData])



  return (
    <View style={{ backgroundColor: colors.primary }} classname="flex-1" >
      <StatusBar backgroundColor={colors.primary} />
      <View className="h-1/3 flex justify-center items-center overflow-hidden">
        <View style={{ borderColor: colors.secondary }} className="h-40 w-40 rounded-full flex justify-center items-center border-4 bg-white">
          <MaterialCommunityIcons name='account' size={100} color={colors.primary} />
          <Text style={{ color: colors.primary }} className="text-xl font-medium" >Login</Text>
        </View>
      </View>
      <AppBadge classname={"h-2/3 rounded-t-3xl flex justify-center items-center p-2"}>

        <Text style={{ color: colors.primary }} className="font-bold text-2xl m-4" >Welcom Back</Text>
        <AppText className="text-xl" >
          {JSON.stringify({ responseData , error , loading })}
        </AppText>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}

        >
          <AppInput
            label={"phone number"}
            iconName={"phone"}
            keyboardType='numeric'
            value={phoneNumber}
            onChangeText={e => { setPhoneNumber(e) }}
            error={!verifyPhoneNumber(phoneNumber)}
            errorMessage="inter a valide phone number"
          />
          <AppInput
            password
            value={password}
            label={"Password"}
            iconName={"key"}
            onChangeText={e => { setPassword(e) }}
            error={!VerifyPassword(password)}
            errorMessage="password at list 6 caracter"
          />
          <View className="w-full p-2">
            <AppButton classname={"py-1"} disabled={!verifyInputs([password, phoneNumber])} onPress={() => login(phoneNumber,password)} icon={"login"} >Login</AppButton>
          </View>
          <View style={{ width: '80%' }} >
            <AppSeparator text="or" />
          </View>
          <View className="w-full p-2">
            <AppButton classname={"py-1"} icon={"account-plus"} onPress={() => { navigation.navigate('register') }} outLine >sign up</AppButton>
          </View>
        </ScrollView>
      </AppBadge>
      {loading && <AppActivityIndicator />}
    </View >
  )
}

export default LoginScreen