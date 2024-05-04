
import { useEffect, useRef, useState } from 'react';
import { FlatList, Image, View } from 'react-native'
import { AppActivityIndicator, AppInput, AppText, MessageContainer } from '../componenet'
import { io } from "socket.io-client"
import colors from '../colors';
import usePost from '../apis/usePost';
import baseUrl from '../apis/apiClient';

const ChatScreen = ({ navigation, route }) => {
  const { convId, currentUser, otherUser, otherUserDetails } = route.params;

  const [newMessage, setNewMessage] = useState("");
  const [recivedMessage, setRecivedMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const socket = useRef();
  const flatListRef = useRef()
  const { error: sendError, loading, postData } = usePost()

  //fetch the messages 
  const getMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/messages/${convId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await res.json();
      setMessages(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      setMessages([]);
    }
  };

  useEffect(() => {
    getMessages();
  }, [convId]);

  //page of message
  const loadMoreMessages = () => {
    setPage(prv => prv + 10);
  };

  //connect to socket server
  useEffect(() => {
    socket.current = io("ws://192.168.1.16:8900");
  }, []);

  //conncet the userser to socket
  useEffect(() => {
    socket.current.emit('addUser', currentUser);
  }, [currentUser]);

  //get the messages
  useEffect(() => {
    socket.current.on("getMessage", message => {
      setRecivedMessage({
        convId,
        sender: message.senderId,
        content: message.content,
        createdAt: Date.now()
      });

    });
  }, [recivedMessage]);

  //add the recived message the messages
  useEffect(() => {

    if (currentUser === recivedMessage?.sender || otherUser === recivedMessage?.sender) {
      setMessages(prv => [...prv, recivedMessage])
    }
  }, [recivedMessage])

  //post new message the db and soket io and adet the messages
  const sendNewMessage = async () => {
    await postData("/messages", { convId, sender: currentUser, content: newMessage });
    setMessages(prv => [...prv, {
      convId,
      sender: currentUser,
      content: newMessage,
      createdAt: Date.now()
    }])

    socket.current.emit("sendMessage", {
      senderId: currentUser,
      reciverId: otherUser,
      content: newMessage
    });
    sendError && alert("check your enter connetion")
    setNewMessage("");

  };
  //edite the screen header
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
     
    });
  }, []);
  //render the messages
  const renderMessage = ({ item, index }) => (
    <MessageContainer

      key={index}
      date={item?.createdAt}
      message={item?.content}
      sender={item?.sender}
      user={currentUser}
      otherUser={otherUser}
    />
  );


  useEffect(() => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  }, [messages])

  return (
    <View className="flex items-center  w-full flex-1">
      {error && <Text className="text-red-500 text-center" >check your internet connexion</Text>}
      {(loading || isLoading) && <AppActivityIndicator />}
      {messages && (
        <View className="flex items-center  w-full flex-1">

          <FlatList
            ref={flatListRef}
            inverted
            style={{ width: "95%", display: "flex", flex: 1 }}
            data={[...messages].reverse().slice(0, page)}
            renderItem={renderMessage}
            keyExtractor={(item, index) => index}
            onEndReached={loadMoreMessages}
            onEndReachedThreshold={0.1}

          />
          <View className="w-full px-2 pb-1" >
            <AppInput
              containerStyle={{ borderWidth: 2, borderColor: colors.primary }}
              disableRightIcon={newMessage == ""}
              rightIcon={"send"}
              value={newMessage}
              onChangeText={(e) => setNewMessage(e)}
              placeholder="type your message"
              onpress={sendNewMessage}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ChatScreen;
