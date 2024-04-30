import { View, FlatList, Image } from 'react-native'
import React from 'react'

import { AppActivityIndicator, AppMessageCard, AppSeparator, AppText } from "../componenet"

import useGet from '../apis/useGet';
import { useCurrentUser } from '../store';
import AppLoadingCard from '../componenet/AppLoadingCard';
const ConversationScreen = ({ navigation }) => {

  const { currentUser } = useCurrentUser()
  const { data, isLoading, error } = useGet(`/conversation/${currentUser.userId}`)
  return (
    <>
      {isLoading && 
      <AppLoadingCard message />
      
      }
      {error && <AppText>
        {error?.message}
      </AppText>
      }
      {
        data && <View className="flex-1">

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