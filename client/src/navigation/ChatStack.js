import { createStackNavigator } from "@react-navigation/stack";
import { ChatScreen, ConversationScreen } from "../screens";

const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="conversation"
        component={ConversationScreen}
        
      />
      <Stack.Screen
        name="chats"
        component={ChatScreen}
        
      />
    </Stack.Navigator>
  );
}
export default ChatStack;
