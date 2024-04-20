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

// import React from 'react'
// import { Button, Text, View } from 'react-native'
// import usePost from './src/apis/usePost'
// const App = () => {
//   const { error, loading, postData, responseData } = usePost()
//   return (
//     <View className="flex flex-1 justify-center items-center">
//       <Button title='red' onPress={() => postData("/auth/login", { phoneNumber: "21724622", password: "123456" })} ></Button>
//       <Text>
//         {JSON.stringify({ loading, error, responseData })}
//       </Text>

//     </View>
//   )
// }

// export default App


