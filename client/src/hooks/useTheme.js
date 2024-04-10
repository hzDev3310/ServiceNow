import colors from "../colors";
import { useDarkMode } from "../store";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const useTheme = () => {
  const { darkMode } = useDarkMode();

  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      card: colors.light,
      text: colors.black,
    },
  };

  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.primary,
      card: colors.dark,
      text: colors.white,
    },
  };
  const theme = darkMode ? darkTheme : lightTheme;
  return {theme , lightTheme , darkTheme};
};

export default useTheme;
