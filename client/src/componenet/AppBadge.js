import { View, Text } from "react-native";
import { useDarkMode } from "../store";

const AppBadge = ({ children, classname, ...otherProps }) => {
  const { darkMode } = useDarkMode();

  return (
    <View className={`${darkMode ? 'bg-stone-900' : 'bg-white'} ${classname}`} {...otherProps}>
      {children}
    </View>
  );
};

export default AppBadge;
