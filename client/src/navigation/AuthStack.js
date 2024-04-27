import { createStackNavigator } from "@react-navigation/stack";
import { ProfilScreen, LoginScreen, RegisterScreen } from "../screens";
import AppTab from "./AppTab";

function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
export default AuthStack;
