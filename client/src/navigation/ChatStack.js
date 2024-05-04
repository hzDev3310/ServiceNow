import { createStackNavigator } from "@react-navigation/stack";
import { ChatScreen, ConversationScreen } from "../screens";
import colors from "../colors";
const Stack = createStackNavigator();
function ChatStack() {
  return (
    <Stack.Navigator  
    >
      <Stack.Screen
        name="conversation"
        options={{
          title:"Conversations",
          headerTitleAlign : "center",
          headerTitleStyle :{color :colors.primary , fontWeight : "bold" , fontSize : 25}
        }}
        component={ConversationScreen}
        
      />
      
      <Stack.Screen
        name="chat"
        component={ChatScreen}
        options={{}}

      />
        
    </Stack.Navigator>
  );
}
export default ChatStack;
