import React, { useEffect } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import AppText from './AppText';
import useGet from '../apis/useGet';
import { useNavigation } from '@react-navigation/native';
import { useOtherUser } from '../store';
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
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        source={data && data.pic ? { uri: data.pic } : require("../assets/img/noProfilPic.jpg")}
                    />
                    
                    <View style={{ marginLeft: 10 }}>
                        <AppText>{data?.name}</AppText>

                    </View>
                </TouchableOpacity>
            }
        </>
    );
};

export default AppMessageCard;
