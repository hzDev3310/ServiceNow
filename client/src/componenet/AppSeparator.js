import React from 'react';
import { Text, View } from 'react-native';

const AppSeparator = ({ text = null , color = 'gray'  , ...otherProps}) => {
    if (text != null) {
        return (
            <View {...otherProps} style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: color, height: 1, width: '50%' }} />
                <Text style={{ color: color, fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase', marginHorizontal: 8 }}>{text}</Text>
                <View style={{ backgroundColor: color, height: 1, width: '50%' }} />
            </View>
        );
    } else {
        return <View {...otherProps}  style={{ backgroundColor: color, height: 1, width: '100%' }}><Text> </Text></View>;
    }
};

export default AppSeparator;
