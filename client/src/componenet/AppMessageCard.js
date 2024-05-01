import React, { useEffect } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import AppText from './AppText';
import useGet from '../apis/useGet';
import { useNavigation } from '@react-navigation/native';

import AppBadge from './AppBadge';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AppMessageCard = ({ item, currentUser }) => {
    const navigation = useNavigation()
    const conv = item.item;
    const convId = conv._id
    const otherUser = conv.users.find(user => user !== currentUser);
    const { data, error, isLoading } = useGet(`/users/${otherUser}`, [otherUser]);



    return (
        <>
           
            {error && <AppText>{error.message}</AppText>}
            {
                data &&
                <AppBadge classname={"flex w-full flex-row items-center justify-between rounded-lg p-2"}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('chat', { convId, currentUser, otherUser, otherUserDetails: data })
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            style={{ width: 70, height: 70, borderRadius: 50 }}
                            source={data && data.pic ? { uri: data.pic } : require("../assets/img/noProfilPic.jpg")}
                        />

                        <View style={{ marginLeft: 10 }}>
                            <AppText>{data?.name}</AppText>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons color={"gray"} name='login' />
                    </TouchableOpacity>
                </AppBadge>
            }
        </>
    );
};

export default AppMessageCard;
