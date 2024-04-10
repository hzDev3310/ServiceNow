// Model.js

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from '../colors';

const AppActivityIndicator = () => {

  return (
    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}} className=" absolute w-screen h-screen justify-center items-center" >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default AppActivityIndicator;
