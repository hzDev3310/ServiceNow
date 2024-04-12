
import { View, Button } from 'react-native';

import AppAlert from '../componenet/AppAlert';
import { useState } from 'react';
import { AppText } from '../componenet';
import useGet from '../apis/useGet';
const ChatScreen = ({ naviagtion, route }) => {
  const convId = route.params.conv._id
  const {data,isLoading , error} = useGet(`conversation/${convId}/messages`) 
  return (
    <View>
      <AppText>
        {JSON.stringify(data)}
      </AppText>
    </View>
  );
};


export default ChatScreen