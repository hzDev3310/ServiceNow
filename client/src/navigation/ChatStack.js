import { createStackNavigator } from "@react-navigation/stack";
import { ChatScreen } from "../screens";

const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="chat screen"
        component={ChatScreen}
        
      />
    </Stack.Navigator>
  );
}
export default ChatStack;
