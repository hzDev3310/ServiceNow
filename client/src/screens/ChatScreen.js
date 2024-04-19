
import { View, FlatList, ActivityIndicator } from 'react-native';
import { AppBadge, TimeElapsedComponent, AppInput, AppText } from '../componenet';

import { useEffect, useRef, useState } from 'react';

import useGet from '../apis/useGet';
import usePost from '../apis/usePost';


const ChatScreen = ({ naviagtion, route }) => {
  const { conv, otherUser, currentUser } = route.params
  const { data, isLoading, error } = useGet(`conversation/${conv._id}/messages`)

  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const flatListRef = useRef(null);

  const handleScroll = async (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    if (
      contentOffset.y !== contentSize.height - layoutMeasurement.height
    ) {
      await setIsUserScrolling(true);
    } else {
      await setIsUserScrolling(false);
    }
  };

  useEffect(() => {
    const scrollToEndView = async () => {
      if (!isUserScrolling && flatListRef.current) {
        await flatListRef.current.scrollToEnd();
      }
    }
    scrollToEndView()
  }, [data, isUserScrolling]);


  const [newMessage, setNewMessage] = useState('')
  const { postData, loading, error: errorPost } = usePost()

  const sendMessge = () => {
    postData(`conversation/${conv._id}`, { sender: currentUser, content: newMessage })
    flatListRef.current.scrollToEnd();
  }
  if (loading || isLoading) {
    return (
      <ActivityIndicator />
    )
  }
  { error || errorPost && alert('check your internet connection') }
  return (

    <View className="flex flex-1 px-1">

      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        renderItem={({ item }) =>
          <View>
            <View className={`w-full my-2 flex-row items-center ${currentUser == item.sender && "justify-end"}`}>

              <AppBadge style={{ maxWidth: '80%' }} classname={`p-2 rounded-2xl mx-1  ${otherUser == item.sender && "bg-blue-700 text-white"}`}>
                <AppText className={otherUser == item.sender && " text-white"} >
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