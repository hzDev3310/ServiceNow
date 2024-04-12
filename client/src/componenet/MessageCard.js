import React from 'react'
import AppText from './AppText'


const MessageCard = ({ convId ,currenUser,otherUser }) => {

    return (
        <AppText>{JSON.stringify(convId)}</AppText>
    )
}

export default MessageCard
