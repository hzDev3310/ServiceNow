import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeStack, ChatStack } from "./";
import { useDarkMode, useIsLogin } from "../store";
import colors from "../colors";
import AccountStack from "./AccountStack";


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
       component={AccountStack}
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
