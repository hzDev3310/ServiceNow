// import { View,  TouchableWithoutFeedback, StyleSheet } from "react-native";
// import {  Ionicons, MaterialIcons } from "@expo/vector-icons";

// import { useDarkMode } from "../store";

// const ColorModeSwitch = () => {
//   const { darkMode, changeDarkMode } = useDarkMode();
//   const styles = StyleSheet.create({
//     dark: { position: "absolute", right: 0 },
//     light: { position: "absolute", left: 0 },
//   });
//   return (
//     <TouchableWithoutFeedback
//       onPress={changeDarkMode}
//       className="px-2 bg-red-800"
//     >
//       <View className=" w-16  border-4 border-blue-600 rounded-full flex flex-row  justify-between items-center ">
//       <MaterialIcons name="sunny" size={24} color="black" />
//         <Ionicons name="moon" size={24} color="#ff0" />
//         <View
//           className="h-7 w-7 bg-blue-600 rounded-full"
//           style={darkMode ? styles.light : styles.dark}
//         />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// export default ColorModeSwitch;
import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { useDarkMode } from "../store";

const ColorModeSwitch = () => {
  const { darkMode, changeDarkMode } = useDarkMode();
  return (
    <TouchableWithoutFeedback onPress={changeDarkMode}>
      <View  className="px-2">
        <Text className="text-xl" >{!darkMode ? "🌙" : "🌞"}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ColorModeSwitch;
