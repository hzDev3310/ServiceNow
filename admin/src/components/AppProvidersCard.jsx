import React from 'react'
import AppBadge from './AppBadge'
import AppButton from './AppButton'

const AppProvidersCard = ({ service, id }) => {
    return (
        <AppBadge classname="mb-4 p-4  h-34  w-[80%] rounded-xl flex items-center justify-between">
            <div className='flex space-x-4 h-full items-center'>
                <img className='w-28 h-28 rounded-full' src={service.profilPic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="cc" />
                <div className='h-full flex flex-col justify-center'>
                    <h1>{service.ProviderName}</h1>
                    <h1>{service.serviceName}</h1>
                    <h2>{service.location.cityName}</h2>
                    <a href="dd" className='underline' >View More</a>
                </div>
            </div>
            <div className='h-full flex flex-col justify-between' >
                <AppButton >accept</AppButton>
                <AppButton classname={"bg-danger"}  >refuse</AppButton>
            </div>
        </AppBadge >
    )
}

export default AppProvidersCard
