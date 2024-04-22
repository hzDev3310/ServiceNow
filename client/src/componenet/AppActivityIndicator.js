// Model.js

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from '../colors';

const AppActivityIndicator = () => {

  return (
    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}} className=" absolute w-screen h-screen justify-center items-center z-1" >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default AppActivityIndicator;
