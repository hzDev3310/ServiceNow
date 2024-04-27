import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen  , ServiceProviderScreen} from "../screens";
import colors from "../colors";

import AppAuth from "../componenet/AppAuth";
const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home screen"
        component={HomeScreen}
        options={{
          headerTitle: "ServiceNow",
          headerTintColor :colors.primary,
          headerTitleAlign : "center",
          headerTitleStyle: { fontWeight: "bold" ,fontSize : 30 },
          headerRight : ()=><AppAuth />,
        }}
      />
      <Stack.Screen
        name="provider"
        component={ServiceProviderScreen}
        options={{
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}
export default HomeStack;
