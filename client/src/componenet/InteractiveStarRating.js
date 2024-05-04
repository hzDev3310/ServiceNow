import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import useUpdate from '../apis/useUpdate';
import AppBadge from './AppBadge';
import AppSeparator from './AppSeparator';
import StarRating from './StarRating';
import AppButton from './AppButton';
import AppText from './AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsLogin } from '../store';

const InteractiveStarRating = ({ serviceRating, total, userId }) => {
  const { error, isLoading, responseData, updateData } = useUpdate()
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(false)
  const {isLogin}=useIsLogin()
  const handleStarPress = (index) => {
    setRating(index + 1);
  };
  const handelUpdate = () => {
    if (!isLogin) {
      AppAlert()
    } else {
      updateData('/users/' +userId||''+"/rating", { value: rating })
    }
  }


  const AppAlert = () =>
    Alert.alert('', 'you need to login ', [
        {
            text: 'cancel',
            style: 'cancel',
        },
        { text: 'ok', onPress: ()=>{navigation.navigate('auth')} },
    ]);
  useEffect(() => {
    responseData && alert("thank you")
    error && alert("check your internet connexion")
    responseData && setShow(false)
  }, [responseData, error])
  return (
    <AppBadge classname={"w-full p-2 rounded-xl"} >
      {serviceRating != 0 && <>
        <View className={"flex flex-row w-full justify-between"} >
          <View style={{ width: "49%" }} className="flex flex-row items-center justify-center" >
            <AppText className="text-4xl" >{serviceRating}</AppText>
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
                {" " + total}
              </AppText>
            </View>
            <AppText className="text-lg" >
              of Users
            </AppText>
          </View>
        </View>
        <AppSeparator></AppSeparator>
      </>}
      {!show ? <TouchableOpacity onPress={() => { setShow(true) }} className=" w-full" >
        <StarRating rating={0} size={40} />
      </TouchableOpacity>
        :
        <View>
          <View className="flex flex-row w-full  justify-around" >
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} onPress={() => handleStarPress(index)} activeOpacity={0.8}>
                <Text style={[styles.star, index < rating ? styles.yellowStar : styles.grayStar]}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
          <AppButton onPress={handelUpdate} disabled={rating==0}  classname="my-2" >Add a rating</AppButton>
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
