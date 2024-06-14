import { useEffect, useState } from 'react';
import { useCurrentUser } from '../store';
import { SafeAreaView, View, Text } from 'react-native';
import AppBadge from './AppBadge';
import AppInput from './AppInput';
import AppCommentCard from './AppCommentCard';
import useUpdate from "../apis/useUpdate";
import colors from '../colors';
import AppActivityIndicator from './AppActivityIndicator';
import AppSeparator from './AppSeparator';


const AppComments = ({ data, providerId }) => {
  const { currentUser } = useCurrentUser()
  const { updateData, responseData, isLoading } = useUpdate()
  const [content, setContent] = useState("")
  const [comments, setComments] = useState(data || []);

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data]);


  useEffect(() => {
    responseData && alert("comment added succusfuly")
    responseData && setComments(prv => [...prv, {
      sender: currentUser?.userId,
      content,
      createdAt: Date.now()
    }])
  }, [responseData])
  return (
    <SafeAreaView>
      {isLoading && <AppActivityIndicator />}
      <AppBadge className={"mt-2 p-2 w-full justify-center items-center flex rounded-xl"}>
        <View className="w-full flex flex-row justify-between items-center" >
          <Text style={{ color: colors.primary }} className=" font-semibold" >
            Write a comment
          </Text>
          <Text style={{ color: "gray" }} >
            {comments && comments.length + " comments"}
          </Text>
        </View>
        <View className="w-full my-2" >
          <AppSeparator />
        </View>
        {currentUser?.userId != providerId && <View className="my-2 w-full flex justify-center items-center " >
          <AppInput label={"white new comment"} value={content} onpress={() => { updateData("/users/" + providerId + "/comment", { value: { sender: currentUser.userId, content } }) }} onChangeText={e => { setContent(e) }} disableRightIcon={content == "" ? true : false} rightIcon={"send"} />
        </View>}

        {comments.length > 0 && comments.reverse().map((comment, index) => (
          <View className="w-full" key={index} >
            <View className="w-full mb-2" ><AppSeparator /></View>
            <AppCommentCard comment={comment} />

          </View>
        ))}
      </AppBadge>
    </SafeAreaView>
  );
};

export default AppComments;
