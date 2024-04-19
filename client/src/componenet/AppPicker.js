import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../colors';

const AppPicker = ({ selectedValue, onValueChange, data }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={onValueChange}
       
      >
       {Object.values(data).map((item, index) => (
          <Picker.Item key={index} label={item.cityName} value={item} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default AppPicker;
