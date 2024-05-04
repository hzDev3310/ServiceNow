import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import AppBadge from './AppBadge'
import AppText from './AppText'
import TimeElapsedComponent from './TimeElapsedComponent'
import colors from '../colors'

const MessageContainer = ({ message, sender, user, otherUser, date }) => {
    const MemoizedComponent = useMemo(() => {
        return (
            <View >
                {
                    sender === user &&
                    <View >
                        <View style={{ alignSelf: 'flex-end', margin: 1, maxWidth: "80%", backgroundColor: colors.primary }} className="p-2 rounded-b-xl rounded-tl-xl" >
                            <Text className="text-white text-base" >
                                {message}
                            </Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end', margin: 1 }} >
                            <TimeElapsedComponent timestamp={date} />
                        </View>
                    </View>
                }
                {
                    sender === otherUser &&
                    <View  >
                        <View style={{ alignSelf: 'flex-start', margin: 1 }}>
                            <AppBadge classname="p-1  rounded-b-xl rounded-tr-xl " style={{ maxWidth: "80%" }} >
                                <AppText className="text-base" >
                                    {message}
                                </AppText>
                            </AppBadge>

                        </View>

                        <TimeElapsedComponent timestamp={date} />

                    </View>
                }
            </View>
        )
    })
    return MemoizedComponent
}

export default MessageContainer
