import React from 'react'
import AppBadge from './AppBadge'
import { ActivityIndicator, Text, View } from 'react-native'
import colors from '../colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AppSeparator from './AppSeparator'

const AppLoadingCard = ({ message = false }) => {
    const renderComponentFiveTimes = () => {
        const components = [];
        for (let i = 0; i < 10; i++) {
            components.push(
                <AppBadge key={i} classname={!message && "mb-2"} >
                    <View className={`flex w-full flex-row items-center justify-between  p-2 rounded-lg`} >
                        <View

                            style={message ? { height: 80 } : { height: 100  }} className="flex flex-row items-center"  >
                            <View style={message ? { width: 70, height: 70, backgroundColor: "gray" } : { width: 85, height: 85, backgroundColor: "gray" }} className={`${message ? "rounded-full" : "rounded-lg"} flex justify-center items-center `} >
                                <ActivityIndicator size={"large"} color={colors.white} ></ActivityIndicator>
                            </View>
                            <View>
                                <View style={{ marginLeft: 10, backgroundColor: "gray" }} className="w-52 rounded-md"  >
                                    <ActivityIndicator size={'small'} color={colors.white}  ></ActivityIndicator>
                                </View>
                                <View style={{ marginLeft: 10, backgroundColor: "gray" }} className="w-44 mt-1 rounded-md "  >
                                    <ActivityIndicator size={'small'} color={colors.white}  ></ActivityIndicator>
                                </View>
                               {!message && <View style={{ marginLeft: 10, backgroundColor: "gray" }} className="w-44 mt-1 rounded-md "  >
                                    <ActivityIndicator size={'small'} color={colors.white}  ></ActivityIndicator>
                                </View>}
                            </View>

                        </View>
                        {
                            message ? <View>
                                <MaterialCommunityIcons color={"gray"} size={25} name='dots-vertical' />
                            </View> :
                                <View className="h-full flex max-h-20  justify-between items-end" >
                                    <Text className="text-xl" > </Text>
                                    <View style={{ backgroundColor: "gray" }} className=" w-8 h-8 flex justify-center items-center rounded-full" >
                                        <MaterialCommunityIcons color={"white"} size={25} name='phone' />
                                    </View>
                                </View>
                        }
                    </View>
                        {message && <AppSeparator />}
                </AppBadge>
            )
        }
        return components;
    }
    return (


        <View>
            {renderComponentFiveTimes()}
        </View>

    )
}

export default AppLoadingCard
