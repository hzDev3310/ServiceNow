import { create } from "zustand";

const useDarkMode = create((set) => ({
  darkMode: true,
  changeDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));



const useCurrentLocation = create((set) => ({
  currentLocation: {
    latitude: null,
    longitude: null,
    cityName: null
  },
  changeLocation: (location) => set((state) => ({ currentLocation: location }))
}));

const useIsLogin = create((set)=>({
  isLogin : false,
  setIsLogin: (b) => set((state) => ({ isLogin: b })),
}))

const useCurrentUser = create((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set((state) => ({ currentUser: user }))
}));

const useOtherUser = create((set) => ({
  otherUser: {},
  changeUser: (user) => set((state) => ({ otherUser: user }))
}));


export { useCurrentLocation, useDarkMode,useCurrentUser ,useOtherUser, useIsLogin }