import { View, Text } from "react-native";
import React from "react";
import AppText from "./AppText";
import colors from "../colors";

const Availability = () => {
  const days = [
    {
      name: "Monday",
      logo: "M",
    },
    {
      name: "Tuesday",
      logo: "T",
    },
    {
      name: "Wednesday",
      logo: "W",
    },
    {
      name: "Thursday",
      logo: "Th",
    },
    {
      name: "Friday",
      logo: "F",
    },
    {
      name: "Saturday",
      logo: "Sa",
    },
    {
      name: "Sunday",
      logo: "Su",
    },
  ];

  const a = {
    from: 0,
    to: 4,
  };

  return (
    <View className="flex flex-row">
      {days.map((day, index) => (
        <View
          key={index}
          style={(index >= a.from && index <= a.to) ? {backgroundColor:colors.primary} :{backgroundColor: colors.secondary}}
          className={`mx-1 p-1 h-8 w-8 flex justify-center items-center rounded-full `}
        >
          <Text className="text-white font-bold">{day.logo}</Text>
        </View>
      ))}
    </View>
  );
};

export default Availability;
