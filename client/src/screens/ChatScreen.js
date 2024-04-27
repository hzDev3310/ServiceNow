
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { AppActivityIndicator, AppInput, AppText, MessageContainer } from '../componenet'
import { useEffect, useState } from 'react';
import useGet from '../apis/useGet'
import usePost from '../apis/usePost';
import colors from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {io} from "socket.io-client"

const ChatScreen = ({ navigation, route }) => {

  const { convId, currentUser, otherUser, otherUserDetails } = route.params;
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { data, error, isLoading } = useGet("/messages/" + convId);
  const { responseData, error: sendError, loading, postData } = usePost()

  const renderMessage = ({ item }) => (
    <MessageContainer
      key={item._id.toString()}
      date={item.createdAt}
      message={item.content}
      sender={item.sender}
      user={currentUser}
      otherUser={otherUser}
    />
  );

  const sendNewMessage = async () => {
    await postData("/messages", { convId, sender: currentUser, content: newMessage });
    responseData && setNewMessage("");
  };


  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 36, height: 36, borderRadius: 18 }}
            source={otherUserDetails.pic !== '' ? { uri: otherUserDetails.pic } : require("../assets/img/noProfilPic.jpg")}
          />
          <AppText className="font-medium text-lg" style={{ marginLeft: 8 }}>{otherUserDetails?.name}</AppText>
        </View>
      ),
      headerTitleAlign: "center",
      headerRight: () =>
        <TouchableOpacity className="mr-3">
          <MaterialCommunityIcons name="chat-remove" size={24} color={colors.primary} />
        </TouchableOpacity>,
    });
  }, []);

  useEffect(() => {
    sendError && alert(sendError.message);
    error && alert(error.message);
  }, [sendError]);

  useEffect(()=>{
    setSocket(io("ws://192.168.1.16:8900"))
  },[])


 

  return (
    <View className="flex items-center  w-full flex-1">
      {(loading || isLoading )&& <AppActivityIndicator />}
      {data && (
        <View className="flex items-center  w-full flex-1">
          <FlatList
            inverted
            style={{ width: "95%", display: "flex", flex: 1 }}
            data={[...data].reverse()}
            renderItem={renderMessage}
            keyExtractor={(item) => item._id.toString()}

          />
          <AppInput
            disableRightIcon={newMessage == ""}
            rightIcon={"send"}
            value={newMessage}
            onChangeText={(e) => setNewMessage(e)}
            placeholder="type your message"
            onpress={sendNewMessage}
          />
        </View>
      )}
    </View>
  );
};

export default ChatScreen;
