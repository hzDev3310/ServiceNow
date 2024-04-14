
import { View, Button, FlatList, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native';

import AppAlert from '../componenet/AppAlert';
import { useEffect, useRef, useState } from 'react';
import { AppBadge, AppButton, AppInput, AppText } from '../componenet';
import useGet from '../apis/useGet';
import usePost from '../apis/usePost';
import TimeElapsedComponent from '../componenet/TimeElapsedComponent';
import { useOtherUser } from '../store';
import { useFocusEffect } from '@react-navigation/native';
const ChatScreen = ({ naviagtion, route }) => {
  const { conv, otherUser, currentUser } = route.params
  const { data, isLoading, error } = useGet(`conversation/${conv._id}/messages`)

  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const flatListRef = useRef(null);

  // Function to handle user scrolling
  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    // Check if user is actively scrolling
    if (
      contentOffset.y !== contentSize.height - layoutMeasurement.height
    ) {
      setIsUserScrolling(true);
    } else {
      setIsUserScrolling(false);
    }
  };



  // Scroll to the end when the data changes, unless the user is actively scrolling
  useEffect(() => {
    if (!isUserScrolling && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [data, isUserScrolling]);

  const [newMessage, setNewMessage] = useState('')
  const { responseData, postData, loading, error: errorPost } = usePost()

  const sendMessge = async () => {
    await postData(`conversation/${conv._id}`, { sender: currentUser, content: newMessage })
    flatListRef.current.scrollToEnd({ animated: true });
  }

  return (

    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        renderItem={({ item }) =>
          <View>
            <View className={`w-full my-2 flex-row items-center ${currentUser == item.sender && "justify-end"}`}>

              <AppBadge style={{ maxWidth: '80%' }} classname={`p-2 rounded-2xl mx-1  ${otherUser == item.sender && "bg-blue-700 text-white"}`}>
                <AppText>
                  {item.content}
                </AppText>
              </AppBadge>

            </View>
            <View className={`w-full  flex-row items-center ${currentUser == item.sender ? "justify-end mr-2" : "ml-2"}`}>
              <TimeElapsedComponent timestamp={item.updatedAt}></TimeElapsedComponent>
            </View>
          </View>
        }
      />
      <View className='flex flex-row items-center justify-center'>
        <AppInput
          placeholder='Type your message...'
          value={newMessage}
          onChangeText={e => { setNewMessage(e) }}
          rightIcon="send"
          onpress={sendMessge}
        />
      </View>

    </View>

  );
};


export default ChatScreen