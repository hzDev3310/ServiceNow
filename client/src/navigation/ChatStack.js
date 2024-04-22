import { createStackNavigator } from "@react-navigation/stack";
import { ChatScreen, ConversationScreen, LoginScreen } from "../screens";
import { useOtherUser } from "../store";
import { AppText } from "../componenet";
import { Image, View } from "react-native";

const Stack = createStackNavigator();

function ChatStack() {
  const {otherUser} = useOtherUser()
  return (
    <Stack.Navigator  
    >
      <Stack.Screen
        name="conversation"
        component={ConversationScreen}
        
      />
      
      <Stack.Screen
        name="chat"
        component={ChatScreen}
        options={{}}

      />
        <Stack.Screen options={{headerShown :false}} name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
export default ChatStack;
