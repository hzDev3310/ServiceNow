import React from 'react';
import { View, Text } from 'react-native';


const StarRating = ({ rating ,size }) => {


  const yellowStars = Math.floor(rating);
  const grayStar = 5-yellowStars
  const stars = [];

  for (let i = 0; i < yellowStars; i++) {
    stars.push(<Text key={i} style={{
      color: 'orange',
      fontSize: size,
    }}>★</Text>);
  }
  for (let i = 0; i < grayStar; i++) {
    stars.push(<Text key={i+yellowStars} style={{
      color: 'gray',
      fontSize: size,
    }}>★</Text>);
  }

  return (
    <View className="flex flex-row items-center w-full justify-around">
      {stars}
    </View>
  );
};


export default StarRating;
