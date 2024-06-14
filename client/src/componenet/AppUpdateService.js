import React, { useEffect, useState } from 'react'
import AppUpdateModel from './AppUpdateModel'
import AppUpdateInput from './AppUpdateInput'
import AvailabilityEditor from './AppAvailabilityEditor'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useDelete from '../apis/useDelete'
import AppActivityIndicator from './AppActivityIndicator'
import AppText from './AppText'
import useUpdate from '../apis/useUpdate'
const AppUpdateService = ({ user }) => {
    const {error , responseData , isLoading,updateData}=useUpdate();
    const deleteService =()=>{
        updateData("/serivces/"+user._id);
    }

    useEffect(()=>{
        responseData && alert(responseData?.message)
        error && alert(error?.message)
        console.log({responseData ,error})
    },[error  , responseData])
    const [openModel, setOpenModel] = useState(null);

    const handleModelToggle = (model) => {
        setOpenModel(openModel === model ? null : model);
    };
    
    const appAlert = ()=>{
        Alert.alert('', 'Are you sure! you want to remove your service ' , [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Yes', onPress: deleteService },
        ]);
    } 
    return (
      <>
      {isLoading ? <AppActivityIndicator/> :   <View className="px-2">
        {<AppText>
           
            </AppText>}
            <View className="flex flex-row justify-between items-center px-2 w-full">
                <Text className=" text-lg font-semibold mb-2 " style={{ color: colors.primary }} >
                    Edit your service
                </Text>
                <TouchableOpacity className="bg-red-600 p-1 my-1 rounded-lg "  onPress={appAlert} >
                    <MaterialCommunityIcons name='delete-forever' size={24} color={"white"}  ></MaterialCommunityIcons>
                </TouchableOpacity>
            </View>
           
            <AppUpdateModel
                isOpen={openModel === 'av'}
                toggleModel={() => handleModelToggle('av')}
                icon={"clock"} label={`update your availability`}>
                <AvailabilityEditor user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel
                isOpen={openModel === 'dis'}
                toggleModel={() => handleModelToggle('dis')}
                icon={"format-align-left"} label={`change your description`}>
                <AppUpdateInput icon={"format-align-left"} label={`description`} attribute={"description"} user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel
                isOpen={openModel === 'exp'}
                toggleModel={() => handleModelToggle('exp')}
                icon={"account-hard-hat"} label={`update your experience at work`}>
                <AppUpdateInput label={`experience`} icon="format-align-left" attribute={"experience"} user={user._id} />
            </AppUpdateModel>

        </View>}
      </>
    )
}

export default AppUpdateService
