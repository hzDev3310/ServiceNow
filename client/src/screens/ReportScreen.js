import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { AppActivityIndicator, AppInput, AppText } from '../componenet'
import { useCurrentUser } from '../store'
import usePost from '../apis/usePost'
import colors from '../colors'

const ReportScreen = ({ navigation, route }) => {
  const providerId = route.params.providerId
  const { currentUser } = useCurrentUser()
  const [content, setContent] = useState("")
  const { error, loading, postData, responseData } = usePost()

  useEffect(() => {

    responseData && alert(responseData.message)
  }, [responseData])

  return (
    <View className="flex flex-1 justify-center items-center p-4" >
      <Text style={{ color: colors.primary }} className="text-lg text-center font-semibold "  >
        if you have an issue wthis this Service Send Report about that
      </Text>
      <View className="w-full my-2">
        <AppInput
          multiline={true}
          value={content}
          label={"write your report here"}
          rightIcon={"send"}
          disableRightIcon={content == ""}
          onChangeText={e => { setContent(e) }}
          onpress={() => postData("/reports", { userId: currentUser.userId, providerId, content })}
        />
      </View>
      {loading && <AppActivityIndicator />}
      {error && <Text style={{ color: colors.danger }} >Check your internet connexion</Text>}


    </View>
  )
}

export default ReportScreen
