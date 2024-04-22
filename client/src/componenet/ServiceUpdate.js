import React from 'react'
import AppBadge from './AppBadge'
import UpdateCard from './UpdateCard'
import UpdateSelect from './UpdateSelect'
import {serviceProviders} from '../storage'
const ServiceUpdate = ({data}) => {
    return (
        <AppBadge classname={"mt-2"}>
            <UpdateSelect icon={"cog"} userId={data._id}  attribute="serviceName" data={serviceProviders} label={"change your service"} />
          <UpdateCard userId={data._id} keyName={"email"} update={"email"} icon={"email"} item={data?.email?.emailAddress} />
          <UpdateCard userId={data._id} keyName={"description"} update={"email"} icon={"text"}  />
        </AppBadge>
    )
}

export default ServiceUpdate
