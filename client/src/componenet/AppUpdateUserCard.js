import React from 'react'
import AppUpdateModel from './AppUpdateModel'
import AppUpdateInput from './AppUpdateInput'
import AppBadge from './AppBadge'
import AppUpdateSelecet from './AppUpdateSelecet'
import { useNavigation } from '@react-navigation/native'
import { locations } from '../storage'

const AppUpdateUserCard = ({ user }) => {
    const navigation = useNavigation();
    return (
        <AppBadge>
            <AppUpdateModel icon={"account"} label={`name : ${user.name}`}>
                <AppUpdateInput label={`name`} icon="account" attribute={"name"} user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel icon={"phone"} label={`phone number : ${user.phoneNumber.number}`}>
                <AppUpdateInput label={`phone Number`} icon="phone" attribute={"number"} user={user._id} />
            </AppUpdateModel>
            {
                user.email &&
                <AppUpdateModel icon={"email"} label={`email : ${user.email.emailAddress}`}>
                    <AppUpdateInput label={`email`} icon="email" attribute={"email"} user={user._id} />
                </AppUpdateModel>
            }
            <AppUpdateModel icon={"key"} label={`change your password`}>
                <AppUpdateInput label={`password`} icon="key" attribute={"password"} user={user._id} />
            </AppUpdateModel>


            <AppUpdateModel icon={"map-marker"}  label={`change your location`}>
                <AppUpdateSelecet data={locations} label={"location"} attribute={"location"} user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel icon={"image-edit"} label={`change your profil picture`} nav={() => navigation.navigate("updateImage" , {attribute : "profilPic",label : "are sure! you want to change your profil picture"})} />


        </AppBadge>
    )
}

export default AppUpdateUserCard
