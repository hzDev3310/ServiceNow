import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import AppBadge from './AppBadge'

const AppLoadingProfil = () => {
    return (
        <View className="h-full" >
            <AppBadge classname=" flex flex-row items-center p-2">
                <View style={{ backgroundColor: "gray" }} className="h-24 w-24 rounded-lg flex justify-center items-center" >
                    <ActivityIndicator size={"large"} color={"white"} />
                </View>
                <View className="h-24 w-24 rounded-lg flex justify-center" >
                    <View style={{ backgroundColor: "gray" }} className="ml-2 h-6 my-1 w-36 rounded-lg flex justify-center items-center" >
                        <ActivityIndicator color={"white"} />
                    </View>
                    <View style={{ backgroundColor: "gray" }} className="ml-2 h-6 my-1 w-40 rounded-lg flex justify-center items-center" >
                        <ActivityIndicator color={"white"} />
                    </View>
                    <View style={{ backgroundColor: "gray" }} className="ml-2 h-6 my-1 w-44 rounded-lg flex justify-center items-center" >
                        <ActivityIndicator color={"white"} />
                    </View>
                </View>

            </AppBadge>
            <AppBadge classname="p-4 mt-4">
                <View  style={{backgroundColor : "gray"}}  className="h-64  flex  items-center justify-center p-2 rounded-lg " >
                    <ActivityIndicator size={'large'} color={"white"} />
                </View>
            </AppBadge>
            <AppBadge classname="p-4 mt-4">
                <View  style={{backgroundColor : "gray"}}  className="h-64  flex  items-center justify-center p-2 rounded-lg " >
                    <ActivityIndicator size={'large'} color={"white"} />
                </View>
            </AppBadge>
        </View>
    )
}

export default AppLoadingProfil
