import React, { useState } from 'react'
import AppUpdateModel from './AppUpdateModel'
import AppUpdateInput from './AppUpdateInput'
import AppUpdateSelecet from './AppUpdateSelecet'
import { serviceProviders } from "../storage"
import AvailabilityEditor from './AppAvailabilityEditor'
import { Text, View } from 'react-native'
const AppUpdateService = ({ user }) => {
    const [openModel, setOpenModel] = useState(null);

    const handleModelToggle = (model) => {
        setOpenModel(openModel === model ? null : model);
    };
    return (
        <View className="px-2">
            <Text className="ml-1 text-lg font-semibold mb-2 " style={{ color: colors.primary }} >
                Edit your service
            </Text>
            <AppUpdateModel
                isOpen={openModel === 'service'}
                toggleModel={() => handleModelToggle('service')}
                icon={"account-hard-hat"} label={`change your service`}>
                <AppUpdateSelecet 
                data={serviceProviders} label={"service"} attribute={"serviceName"} user={user._id} />
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
            <AppUpdateModel
              isOpen={openModel === 'av'}
              toggleModel={() => handleModelToggle('av')}
            icon={"clock"} label={`update your availability`}>
                <AvailabilityEditor user={user._id} />
            </AppUpdateModel>
        </View>
    )
}

export default AppUpdateService
