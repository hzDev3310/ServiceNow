import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, ServiceProviderScreen } from "../screens";
import { Image, View } from "react-native"
import colors from "../colors";
import AppAuth from "../componenet/AppAuth";
import { ColorModeSwitch } from "../componenet";


const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home screen"
        component={HomeScreen}
        options={{
          headerLeft:()=><Image style={{width : 30 , height :30 , marginLeft : 10}} source={require("../assets/favicon.png")} ></Image>,
          headerTitle: "ServiceNow",
          headerTintColor: colors.primary,
          headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
          headerRight: () => <View className="flex flex-row justify-center items-center mr-3">
            <ColorModeSwitch />
            <AppAuth />
          </View>,
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
