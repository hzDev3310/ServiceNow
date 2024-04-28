import * as Location from "expo-location";
import { useState } from "react";

const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState({
    cityName: "Tunis",
    latitude: 36.8065,
    longitude: 10.1815
  });

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = location.coords;

      let address = await Location.reverseGeocodeAsync({ latitude, longitude });
      const cityName = address[0].city;

      setCurrentLocation({
        latitude,
        longitude,
        cityName
      });
    } catch (error) {
     
    }
  };

  return { getLocation, currentLocation };
};

export default useLocation;
