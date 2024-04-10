import { NavigationContainer } from "@react-navigation/native";

import AppTab from "./src/navigation/AppTab";
import useTheme from "./src/hooks/useTheme";

export default function App() {
  const { theme } = useTheme();
  return (

      <NavigationContainer theme={theme}>
        <AppTab />
      </NavigationContainer>
  
  );
}


