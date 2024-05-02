import { View, Text } from "react-native";
import React, { useEffect } from "react";
import AppText from "./AppText";
import colors from "../colors";

const Availability = ({days}) => {
  const daysLogo = [
  
    {
      name: "monday",
      logo: "M",
    },
    {
      name: "tuesday",
      logo: "T",
    },
    {
      name: "wednesday",
      logo: "W",
    },
    {
      name: "thursday",
      logo: "Th",
    },
    {
      name: "friday",
      logo: "F",
    },
    {
      name: "saturday",
      logo: "Sa",
    },
    {
      name: "sunday",
      logo: "Su",
    },
   
  ];


  return (
    <View className="flex flex-row">
      {daysLogo.map((day, index) => (
        <View
          key={index}
          style={days[day.name] ?{backgroundColor:colors.primary} :{backgroundColor: colors.secondary}}
          className={`mx-1 p-1 h-8 w-8 flex justify-center items-center rounded-full `}
        >
          
          <Text className="text-white font-bold">{day.logo}</Text>
        </View>
      ))}
    </View>
  );
};

export default Availability;
