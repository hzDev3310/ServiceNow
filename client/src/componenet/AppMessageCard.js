import React, { useEffect } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import AppText from './AppText';
import useGet from '../apis/useGet';
import { useNavigation } from '@react-navigation/native';

import AppBadge from './AppBadge';
const AppMessageCard = ({ item, currentUser }) => {
    const navigation = useNavigation()
    const conv = item.item;
    const convId = conv._id
    const otherUser = conv.users.find(user => user !== currentUser);
    const { data, error, isLoading } = useGet(`/users/${otherUser}`,[otherUser]);



    return (
        <>
            {isLoading && <ActivityIndicator />}
            {error && <AppText>{error.message}</AppText>}
            {
                data && <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('chat', { convId, currentUser, otherUser,otherUserDetails : data })
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AppBadge classname={"flex w-full flex-row items-center rounded-lg p-2"}>
                        <Image
                            style={{ width: 70, height: 70, borderRadius: 50 }}
                            source={data && data.pic ? { uri: data.pic } : require("../assets/img/noProfilPic.jpg")}
                        />

                        <View style={{ marginLeft: 10 }}>
                            <AppText>{data?.name}</AppText>

                        </View>
                    </AppBadge>
                </TouchableOpacity>
            }
        </>
    );
};

export default AppMessageCard;
