import { View, FlatList } from 'react-native'
import React from 'react'
import { AppMessageCard, AppSeparator, AppText } from "../componenet"
import { useCurrentUser, useMessage } from '../store';
import AppLoadingCard from '../componenet/AppLoadingCard';
import useServices from '../hooks/useServices';
const ConversationScreen = ({ navigation }) => {
  const {lastMessage,setLastMessage} = useMessage()
  const { currentUser } = useCurrentUser()
  const { data, isLoading, error } = useServices(`/conversation/${currentUser.userId}`)
  return (
    <>
      {isLoading &&
        <AppLoadingCard message />

      }
      {error && <View className="flex flex-1 justify-center items-center">
        <AppText className="text-red-500">
          {error?.message}
        </AppText>
      </View>
      }
        {data?.message && <View className="flex flex-1 justify-center items-center">
        <AppText >
          {data?.message}
        </AppText>
      </View>
      }
      {
        data &&
        <View className="flex-1">
          <FlatList
            ItemSeparatorComponent={() => <AppSeparator />}
            data={data}
            renderItem={item => <AppMessageCard item={item} currentUser={currentUser.userId} />}
          ></FlatList>
        </View>
      }
    </>
  )
}

export default ConversationScreen