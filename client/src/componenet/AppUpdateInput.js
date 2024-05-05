import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import useUpdate from "../apis/useUpdate"
import AppInput from './AppInput'
import AppButton from './AppButton'
import AppActivityIndicator from './AppActivityIndicator'
import AppText from './AppText'
import { VerifyPassword, isEmail, verifyName, verifyPhoneNumber } from '../verficationInputs'




const AppUpdateInput = ({ label, icon, user, attribute }) => {
    const [value, setValue] = useState("")
    const [password, setPassword] = useState("")
    const { error, isLoading, responseData, updateData } = useUpdate()
    const check = ( value) => {
        switch (attribute) {
            case "name":
                return verifyName(value);
            case "number":
                return verifyPhoneNumber(value);
            case "email":
                return isEmail(value);
            case "password":
                return VerifyPassword(value);
            default:
                return true;
        }
    }
    const errorMsg = ( value) => {
        switch (attribute) {
            case "name":
                return verifyName(value) ? null : "Invalid name";
            case "number":
                return verifyPhoneNumber(value) ? null : "Invalid phone number";
            case "email":
                return isEmail(value) ? null : "Invalid email";
                case "password":
                return VerifyPassword(value) ? null : "Invalid password";
            default:
                return "Unknown attribute";
        }
    }
    
    
    const handelUpdate = () => {
        updateData(`/users/${user}/${attribute}`, { value ,password})
    }

    useEffect(() => {
        responseData && alert(responseData.message)
        error && alert("check your internt connection")
        setValue('')
        setPassword('')
    }, [error, responseData])

    const AppAlert = () =>
        Alert.alert('', 'Are you sure! you want to update your ' + label, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Yes', onPress: handelUpdate },
        ]);

    if (isLoading) {
        return (<AppActivityIndicator />)
    }
    else {
        return (
            <View className="flex justify-start items-center">

                {attribute==="password" && <AppInput
                     iconName={icon}
                     value={password}
                     onChangeText={e => { setPassword(e) }}
                     placeholder={"your old password" + label}
                     error={!check(value)}
                     errorMessage={errorMsg(value)}
                     keyboardType={attribute === "number" ? 'numeric' : 'default'} 
                     password={attribute==="password"}
                 />}
                <AppInput
                    iconName={icon}
                    value={value}
                    onChangeText={e => { setValue(e) }}
                    placeholder={"change your " + label}
                    error={!check(value)}
                    errorMessage={errorMsg(value)}
                    keyboardType={attribute === "number" ? 'numeric' : 'default'} 
                    password={attribute==="password"}
                />


                <AppButton classname={"my-2"} onPress={AppAlert} >
                    update
                </AppButton>
            </View>
        )
    }
}

export default AppUpdateInput
