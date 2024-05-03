import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { Zocial } from '@expo/vector-icons';
import colors from '../colors';

const CallButton = ({ phoneNumber ,disabled =false}) => {

  const handlePress = () => {
    Linking.openURL(`tel:+216${phoneNumber}`);
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={handlePress} style={disabled ? {backgroundColor : colors.secondary} : {backgroundColor : colors.primary}} 
     className=" w-8 h-8 flex justify-center items-center rounded-full" >
      <Zocial name="call" size={24} color={"white"} />
    </TouchableOpacity>
  );
};

export default CallButton;
