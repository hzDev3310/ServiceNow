
import { View, Button } from 'react-native';

import AppAlert from '../componenet/AppAlert';
import { useState } from 'react';

const ChatScreen = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  return (
    <View>
      <Button title="Show Alert" onPress={()=>setAlertVisible(true)} />
      <AppAlert
        visible={alertVisible}
        message="This is a custom alert message! erzgzeezgezg"
        onClose={()=> setAlertVisible(false)}
      />
    </View>
  );
};


export default ChatScreen