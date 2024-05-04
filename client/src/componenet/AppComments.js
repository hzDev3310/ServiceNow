import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import AppBadge from './AppBadge';
import AppInput from './AppInput';
import AppCommentCard from './AppCommentCard';

import colors from '../colors';

const AppComments = ({ data, providerId }) => {
  return (
    <SafeAreaView style={{ height: 500, }}>
      <AppBadge className={"mt-2 p-2 w-full justify-center items-center flex rounded-xl"}>
        <View className="w-full flex flex-row justify-between items-center" >
          <Text  style={{color :colors.primary}} className=" font-semibold" >
           Write a comment
          </Text>
          <Text style={{color :"gray"}} >
            {data &&  data.length +" comments"} 
          </Text>
        </View>
        <View className="my-2" >
          <AppInput rightIcon={"send"} />
        </View>

        {data.map((comment, index) => (
          <AppCommentCard key={index} comment={comment} />
        ))}

      </AppBadge>
    </SafeAreaView>
  );
};

export default AppComments;
