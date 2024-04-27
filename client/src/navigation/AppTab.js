import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeStack, AuthStack, ChatStack } from "./";
import { useDarkMode, useIsLogin } from "../store";
import colors from "../colors";
import { ProfilScreen } from "../screens";
const TabArr = [
  { route: "auth", label: "Account", component: AuthStack, icon: "account" },
  { route: "Home", label: "Home", component: HomeStack, icon: "home" },
  { route: "Chats", label: "chats", component: ChatStack, icon: "chat" },
];

const Tab = createBottomTabNavigator();

export default function AppTab() {
  const {isLogin}= useIsLogin() 
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: useDarkMode().darkMode ? colors.dark : "white",
          borderTopColor: useDarkMode().darkMode ? colors.dark : "white",
        },
        tabBarStyle: {
          height: 60,
        },
      }}
    >
       <Tab.Screen
          name="homeStack"
          component={HomeStack}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name={"home"}
                size={40}
                color={color}
              />
            ),
          }}
        />
         {
           isLogin && 
           <Tab.Screen
           name="chats"
           component={ChatStack}
           options={{
             tabBarShowLabel: false,
             tabBarIcon: ({color}) => (
               <MaterialCommunityIcons
               name={"chat"}
               size={40}
               color={color}
               />
              ),
            }}
            />
          }
  {
    isLogin && 
    <Tab.Screen
       name="account"
       component={ProfilScreen}
       options={{
         tabBarShowLabel: false,
         tabBarIcon: ({color}) => (
           <MaterialCommunityIcons
             name={"account"}
             size={40}
             color={color}
           />
         ),
       }}
     />
  }
    </Tab.Navigator>
  );
}
