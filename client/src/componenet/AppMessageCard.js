import React, { useEffect } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import AppText from './AppText';
import useGet from '../apis/useGet';
import { useNavigation } from '@react-navigation/native';
import { useOtherUser } from '../store';
import AppBadge from './AppBadge';
const AppMessageCard = ({ item, currentUser }) => {
    const navigation = useNavigation()
    const conv = item.item;
    const otherUser = conv.users.find(user => user !== currentUser);
    const { data, error, isLoading } = useGet(`/users/${otherUser}`);
    const {changeUser} = useOtherUser()
 

    return (
        <>
            {isLoading && <ActivityIndicator />}
            {error && <AppText>{error.message}</AppText>}
            {
                data && <TouchableOpacity
                    onPress={() => {
                        changeUser(data);
                        navigation.navigate('chat', { conv: conv, currentUser, otherUser })}}
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
