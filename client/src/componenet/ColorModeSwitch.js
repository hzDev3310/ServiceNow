import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { useDarkMode } from "../store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../colors";

const ColorModeSwitch = () => {
  const { darkMode, changeDarkMode } = useDarkMode();
  return (
    <TouchableOpacity onPress={changeDarkMode} className="w-10 h-10 justify-center items-center mx-2 rounded-xl"
     style={darkMode ?{backgroundColor : colors.primary} : {backgroundColor : colors.secondary}}>
      <MaterialCommunityIcons name="brightness-6"  color={darkMode ? "white" :"black"}  size={30} />
    </TouchableOpacity>
  );
};

export default ColorModeSwitch;
