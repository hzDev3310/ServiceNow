import { View, FlatList } from 'react-native'
import React from 'react'

import { AppMessageCard, AppSeparator, AppText } from "../componenet"

import useGet from '../apis/useGet';
import { useCurrentUser } from '../store';
import AppLoadingCard from '../componenet/AppLoadingCard';
const ConversationScreen = ({ navigation }) => {

  const { currentUser } = useCurrentUser()
  const { data, isLoading, error } = useGet(`/conversation/${currentUser.userId}`,[data])
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