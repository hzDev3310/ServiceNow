import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDarkMode } from "../store";

function StarRating({ initialRating }) {
  const [rating, setRating] = useState(initialRating);

  const handleStarPress = (index) => {
    setRating(index + 1);
  };
  const {darkMode} =useDarkMode()
  return (
    <View className="w-full flex justify-center items-center">
      <View className={`w-full flex flex-row justify-between items-center px-6 py-4 m-4  rounded-3xl ${darkMode? 'bg-stone-900' : "bg-gray-200"}`} >
        {[1, 2, 3, 4, 5].map((index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              handleStarPress(index);
            }}
          >
            <MaterialCommunityIcons
              name={"star"}
              size={30}
              color={index + 1 <= rating ? "#fbbf24" : "gray"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default StarRating;
