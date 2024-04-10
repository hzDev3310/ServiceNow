import * as Location from "expo-location";
import { useEffect } from "react";
import { useCurrentLocation } from "../store";


const useLocation = () => {
  const { changeLocation, currentLocation } = useCurrentLocation()


  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;

    let address = await Location.reverseGeocodeAsync({ latitude, longitude });
    const cityName = address[0].city;

    changeLocation({
      latitude,
      longitude,
      cityName
    });
  }

  useEffect(() => {
    getLocation()
  }, []);

  return { currentLocation ,getLocation};
};

export default useLocation;
