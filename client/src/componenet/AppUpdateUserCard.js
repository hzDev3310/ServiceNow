import React from 'react'
import AppUpdateModel from './AppUpdateModel'
import AppUpdateInput from './AppUpdateInput'
import AppBadge from './AppBadge'
import AppUpdateSelecet from './AppUpdateSelecet'
import { useNavigation } from '@react-navigation/native'

const AppUpdateUserCard = ({ user }) => {
    const navigation = useNavigation();
    return (
        <AppBadge>
            <AppUpdateModel label={`name : ${user.name}`}>
                <AppUpdateInput label={`name`} icon="account" attribute={"name"} user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel label={`phone number : ${user.phoneNumber.number}`}>
                <AppUpdateInput label={`phone Number`} icon="phone" attribute={"number"} user={user._id} />
            </AppUpdateModel>
            {
                user.email &&
                <AppUpdateModel label={`email : ${user.email.emailAddress}`}>
                    <AppUpdateInput label={`email`} icon="email" attribute={"email"} user={user._id} />
                </AppUpdateModel>
            }
            <AppUpdateModel label={`change your password`}>
                <AppUpdateInput label={`password`} icon="key" attribute={"password"} user={user._id} />
            </AppUpdateModel>


            <AppUpdateModel label={`change your location`}>
                <AppUpdateSelecet label={"location"} attribute={"location"} user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel label={`change your profil picture`} nav={() => navigation.navigate("updateImage" , {attribute : "profilPic",label : "are sure! you want to change your profil picture"})} />


        </AppBadge>
    )
}

export default AppUpdateUserCard
