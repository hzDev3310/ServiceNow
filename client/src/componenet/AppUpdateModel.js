// AppUpdateModel.js

import React from 'react';
import { TouchableOpacity, View } from "react-native";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDarkMode } from "../store";
import AppBadge from "./AppBadge";

const AppUpdateModel = ({ children, label, icon, isOpen, toggleModel }) => {
    const { darkMode } = useDarkMode();

    return (
        <TouchableOpacity onPress={toggleModel}>
            <AppBadge classname="p-2 mb-2 rounded-xl">
                <View className="flex flex-row justify-between items-center">
                    <View className="flex flex-row items-center">
                        <MaterialCommunityIcons color={darkMode ? "white" : "black"} name={icon} size={20} />
                        <AppText className="text-base capitalize ml-1">
                            {label}
                        </AppText>
                    </View>
                    <MaterialCommunityIcons color="gray" name={isOpen ? "window-close" : "lead-pencil"} size={20} />
                </View>
                <View className={!isOpen ? "hidden" : "my-2"}>
                    {children}
                </View>
            </AppBadge>
        </TouchableOpacity>
    );
};

export default AppUpdateModel;
