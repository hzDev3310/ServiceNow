

import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { AppActivityIndicator, AppBadge, AppButton, AppInput, AppPicker } from '../componenet'
import { isEmail } from "../verficationInputs"
import usePost from '../apis/usePost'
import { useCurrentUser } from '../store'
import { serviceProviders } from '../storage'


const OfferServiceScreen = ({ navigation }) => {
    const { currentUser } = useCurrentUser()
    const { loading, error, responseData, postData } = usePost()

    const [body, setBody] = useState({
        serviceName: "",
        email: "",
        description: "",
        experience: 0
    })


    const handelSignUp = () => {
        if (body.serviceName === "") {
            alert("please select service")
        } else {
            postData('/serivces/' + currentUser.userId, body)
        }
    }

    useEffect(() => {
        responseData?.error && alert(responseData.error)
        responseData?.message && alert(responseData.message)
        responseData?.message && navigation.navigate("profil")
    }, [responseData])

    if (loading) {
        return <AppActivityIndicator />
    }
    else return (

        <View className="flex flex-1 h-full bg-blue-700">

            <View className="h-1/3 flex justify-center items-center overflow-hidden">
                <View style={{ borderColor: colors.secondary }} className="h-40 w-40 rounded-full flex justify-center items-center border-4 bg-white">
                    <Image source={require("../assets/adaptive-icon.png")} className="h-36 w-36" />
                </View>

            </View>
            <AppBadge classname={"flex flex-1 justify-center p-1 h-2/3 rounded-t-3xl"}>
                <View>
                    <AppPicker
                        data={serviceProviders}
                        selectedValue={body.serviceName}
                        onValueChange={v => setBody(prevState => ({
                            ...prevState,
                            serviceName: v
                        }))}
                    />
                </View>
                <AppInput
                    iconName={"email"}
                    label={"email"}
                    placeholder='email'
                    value={body.email}
                    error={!isEmail(body.email)}
                    errorMessage="inter a valide email"
                    onChangeText={
                        (text) => setBody(prevState => ({
                            ...prevState,
                            email: text
                        }))}

                />
                <AppInput
                    iconName={"format-align-left"}
                    label={"description"}
                    placeholder='description'
                    value={body.description}
                    onChangeText={
                        (text) => setBody(prevState => ({
                            ...prevState,
                            description: text
                        }))}

                />
                <AppInput
                    iconName={"account-hard-hat"}
                    label={"experience"}
                    placeholder='experience'
                    value={body.experience}
                    onChangeText={
                        (text) => setBody(prevState => ({
                            ...prevState,
                            experience: text
                        }))}

                />
                <AppButton disabled={!isEmail(body.email) || body.email === ""} classname={"mt-2"} onPress={handelSignUp} >add your service </AppButton>

            </AppBadge>
        </View>
    )



}


export default OfferServiceScreen
