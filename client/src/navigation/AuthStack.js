import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegisterScreen } from "../screens";


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
