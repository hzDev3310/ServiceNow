import {Text } from "react-native";
import { useDarkMode } from "../store";

const AppText = ({ children, ...otherProps }) => {
  const { darkMode } = useDarkMode();
  return (
    <Text {...otherProps} className={darkMode && "text-slate-100"}>
      {children}
    </Text>
  );
};

export default AppText;
