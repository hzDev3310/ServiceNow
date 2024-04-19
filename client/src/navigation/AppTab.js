import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeStack, AuthStack, ChatStack } from "./";
import { useDarkMode } from "../store";
import colors from "../colors";
const TabArr = [
  { route: "auth", label: "Account", component: AuthStack, icon: "account" },
  { route: "Home", label: "Home", component: HomeStack, icon: "home" },
  { route: "Chats", label: "chats", component: ChatStack, icon: "chat" },
];

const Tab = createBottomTabNavigator();

export default function AnimTab1() {
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
      {TabArr.map((item, index) => (
        <Tab.Screen
          name={item.label}
          key={index}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name={item.icon}
                size={40}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
