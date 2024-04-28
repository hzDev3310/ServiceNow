
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { AppActivityIndicator, AppButton, AppInput, AppText, MessageContainer } from '../componenet'
import { useEffect, useRef, useState } from 'react';
import useGet from '../apis/useGet'
import usePost from '../apis/usePost';
import colors from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { io } from "socket.io-client"
import baseUrl from '../apis/apiClient';

const ChatScreen = ({ navigation, route }) => {


  const { convId, currentUser, otherUser,otherUserDetails } = route.params;
  const [newMessage, setNewMessage] = useState("");
  const [recivedMessage, setRecivedMessage] = useState(null); // corrected typo
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // corrected initial state
  const [error, setError] = useState(null);
  const socket = useRef();
  const flatRef = useRef()
  const { responseData, error: sendError, loading, postData } = usePost()
  const [visible , setVisable]=useState(false)
  const [isScrolling, setIsScrolling] = useState(false);

 
  const getMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/messages/${convId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await res.json(); // corrected variable declaration
      setMessages(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      setMessages([]); // corrected setting to empty array on error
    }
  };

  useEffect(() => {
    getMessages();
  }, [convId]);


  useEffect(() => {
    // Establish connection with Socket.IO server
    socket.current = io("ws://192.168.1.16:8900");
    // Clean up socket connection when component unmounts
  
  }, []);


  useEffect(() => {
    // Add the currentUser to the list of users when component mounts or currentUser changes
    socket.current.emit('addUser', currentUser);
  }, [currentUser]);

  useEffect(() => {
    // Listen for incoming messages from Socket.IO server
    socket.current.on("getMessage", message => {
      
      // Check if the message is sent by either the currentUser or otherUser
     
        // Update state with the received message
        setRecivedMessage({
          convId,
          sender: message.senderId,
          content: message.content,
          createdAt: Date.now()
        });
      setVisable(true)
    });
    // Clean up socket event listener when component unmounts

  }, [recivedMessage]);

  useEffect(()=>{
    console.log(recivedMessage);
    if (currentUser === recivedMessage?.sender || otherUser === recivedMessage?.sender) {
      console.log(recivedMessage);
      setMessages(prv=>[...prv,recivedMessage])
    }
    
  
  },[recivedMessage])




  const sendNewMessage = async () => {
    await postData("/messages", { convId, sender: currentUser, content: newMessage });

    setMessages(prv=>[...prv,{
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
  
  setVisable(true)
    setNewMessage("");
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

  const renderMessage = ({ item,index }) => (
    <MessageContainer
    
      key={index}
      date={item.createdAt}
      message={item.content}
      sender={item.sender}
      user={currentUser}
      otherUser={otherUser}
    />
  );
  // useEffect(() => {
  //   sendError && alert(sendError.message);
  //   error && alert(error.message);
  // }, [sendError]);




  return (
    <View className="flex items-center  w-full flex-1">
      {(loading || isLoading) && <AppActivityIndicator />}
      {messages && (
        <View className="flex items-center  w-full flex-1">
         
          <FlatList
            ref={flatRef}
            inverted
            style={{ width: "95%", display: "flex", flex: 1 }}
            data={[...messages].reverse()}
            renderItem={renderMessage}
            keyExtractor={(item,index) => index}

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
