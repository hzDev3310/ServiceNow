import React from 'react'
import AppUpdateModel from './AppUpdateModel'
import AppUpdateInput from './AppUpdateInput'
import AppBadge from './AppBadge'
import AppUpdateSelecet from './AppUpdateSelecet'
import { useNavigation } from '@react-navigation/native'
import { serviceProviders } from "../storage"
import AvailabilityEditor from './AppAvailabilityEditor'
import { Text } from 'react-native'
const AppUpdateService = ({ user }) => {
    const navigation = useNavigation();
    return (
        <AppBadge classname={"my-2"}>
             <Text className="ml-2 text-lg font-semibold my-1 " style={{ color: colors.primary }} >
                Edit your service
            </Text>

            <AppUpdateModel icon={"account-hard-hat"} label={`change your service`}>
                <AppUpdateSelecet data={serviceProviders} label={"service"} attribute={"serviceName"} user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel icon={"format-align-left"} label={`change your description`}>
                <AppUpdateInput icon={"format-align-left"} label={`description`} attribute={"description"} user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel icon={"account-hard-hat"} label={`update your experience at work`}>
                <AppUpdateInput label={`experience`} icon="format-align-left" attribute={"experience"} user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel icon={"clock"} label={`update your availability`}>
                <AvailabilityEditor user={user._id} />
            </AppUpdateModel>
        </AppBadge>
    )
}

export default AppUpdateService
