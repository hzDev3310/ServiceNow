import { View, Text, TouchableWithoutFeedback } from "react-native";
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
