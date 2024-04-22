import React, { useState } from 'react'
import UpdateCard from './UpdateCard'
import AppBadge from './AppBadge'
import UpdateSelect from './UpdateSelect'
import {locations} from '../storage'


import { ScrollView } from 'react-native-gesture-handler'
import UploadImage from './UploadImage'

const UserDetailsUpdate = ({ data }) => {
 
    return (
        <AppBadge className={"py-2"}>
            <ScrollView className="">
                
                <UpdateCard userId={data._id} keyName={"name"} update={"name"} icon={"account"} item={data?.name} />
                <UpdateCard userId={data._id} keyName={"phone number"} update={"number"} icon={"phone"} item={data?.phoneNumber?.number} />
                <UpdateCard userId={data._id} keyName={"change password"} update={"password"} icon={"key"} />
                <UpdateSelect icon={"map-marker"} userId={data._id}  attribute="location" data={locations} label={"change your location"} />
                <UploadImage   keyName={"profil picture"} userId={data._id} attribute={"profilPic"}  />
              
            </ScrollView>
        </AppBadge>
    )
}

export default UserDetailsUpdate
