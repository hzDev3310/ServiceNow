import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import useUpdate from '../apis/useUpdate';
import AppBadge from './AppBadge';
import AppSeparator from './AppSeparator';
import StarRating from './StarRating';
import AppButton from './AppButton';
import AppText from './AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCurrentUser, useIsLogin } from '../store';

const InteractiveStarRating = ({ serviceRating, total, userId }) => {
  const { error, isLoading, responseData, updateData } = useUpdate()
  const [rating, setRating] = useState(0);
  const { isLogin } = useIsLogin()
  const [finalRating, setFinal] = useState(serviceRating)
  const [totalRating, setTotal] = useState(total)
  const { currentUser } = useCurrentUser()
  const handleStarPress = (index) => {
    setRating(index + 1);
  };
  const handelUpdate = () => {
    if (!isLogin) {
      AppAlert()
    } else {
      updateData('/users/' + userId + "/rating", { value: rating })
    }
  }


  const AppAlert = () =>
    Alert.alert('', 'you need to login ', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      { text: 'ok', onPress: () => { navigation.navigate('auth') } },
    ]);
  useEffect(() => {
    error && alert("check your internet connexion")
    if (responseData) {
      alert("thank you")
  
     if(totalRating === 0 ){
      setTotal(prv => prv + 1)
      setFinal(rating)
     }
     else{
      const s = finalRating * totalRating + rating
      setFinal(s/(totalRating+1))
      setTotal(prv=>prv+1)
     }
    }
  }, [responseData, error])
  return (
    <AppBadge classname={"w-full p-2 rounded-xl"} >
      {finalRating != 0 && <>
        <View className={"flex flex-row w-full justify-between"} >
          <View style={{ width: "49%" }} className="flex flex-row items-center justify-center" >
            <AppText className="text-4xl" >{finalRating.toFixed(1)}</AppText>
            <MaterialCommunityIcons name='star' color={"orange"} size={40} />
          </View>
          <View style={{ backgroundColor: "gray", width: 1 }} className="h-20 my-1 mb-2" >

          </View>
          <View style={{ width: "49%" }} className="flex  items-center justify-center">
            <View className="flex flex-row">
              <AppText className="text-lg" >
                From
              </AppText>
              <AppText className="text-xl font-medium" >
                {" " + totalRating}
              </AppText>
            </View>
            <AppText className="text-lg" >
              of Users
            </AppText>
          </View>
        </View>
        <AppSeparator></AppSeparator>
      </>}
      {
        currentUser?.userId && currentUser?.userId == userId && <StarRating rating={0} size={40} />
      }
      {currentUser?.userId !== userId &&
        <View>
          <View className="flex flex-row w-full  justify-around" >
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} onPress={() => handleStarPress(index)} activeOpacity={0.8}>
                <Text style={[styles.star, index < rating ? styles.yellowStar : styles.grayStar]}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className={`my-1 ${rating == 0 && "hidden"}`} >
            <AppButton onPress={handelUpdate} >Add a rating</AppButton>
          </View>
        </View>
      }
    </AppBadge>
  );
};

const styles = StyleSheet.create({

  star: {
    fontSize: 40,
  },
  yellowStar: {
    color: 'orange',
  },
  grayStar: {
    color: 'gray',
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default InteractiveStarRating;
