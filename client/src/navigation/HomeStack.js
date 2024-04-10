import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen  , ServiceProviderScreen} from "../screens";
import colors from "../colors";
import { ColorModeSwitch } from "../componenet";
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
          headerRight : ()=><ColorModeSwitch />,
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
