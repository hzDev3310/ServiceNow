import React, { useEffect, useState } from 'react'
import useImage from "../hooks/useImage"
import AppImagePicker from "../componenet/AppImagePicker"
import { useCurrentUser } from '../store'
import { AppActivityIndicator, AppButton, AppText } from '../componenet'
import { Alert, Image, View } from 'react-native'
import baseUrl from '../apis/apiClient'
const UpdateImageScreen = ({ navigation, route }) => {
    const attribute = route.params.attribute
    const label = route.params.label
    const { currentUser } = useCurrentUser();
    const [img, setImg] = useState(null)
    const { error, loading, postImg, responseData } = useImage(img, currentUser.userId, attribute)

    const [profil, seProfil] = useState(null)
    const [errorFetch, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(baseUrl + '/users/' + currentUser.userId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const responseData = await response.json();
                seProfil(responseData);
                setError(null)
            } catch (error) {
                setError(error);
                seProfil(null)
            } finally { setIsLoading(false) }

        };

        fetchData();

    }, [currentUser, profil]);
    useEffect(() => {
        (error || errorFetch) && alert("check your internt connection")
        responseData && alert("photo update succsefuly")
    }, [responseData])

    const AppAlert = () =>
        Alert.alert('', label , [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Yes', onPress: ()=>  postImg() },
        ]);


    if (isLoading || loading) {
        return <AppActivityIndicator />
    } else {
        return (

            <View className="flex flex-1 justify-center items-center p-2">
             

                {img ?
                    <Image
                        style={{ width: "90%", height: undefined, aspectRatio: 1 }}
                        source={{ uri: img }}
                    />
                    : <Image
                        style={{ width: "90%", height: undefined, aspectRatio: 1 }}
                        source={profil?.pic ? { uri: profil?.pic } : require('../assets/img/noProfilPic.jpg')}
                    />
                }


                <View className="my-2">
                    <AppImagePicker selectedImage={img} setSelectedImage={setImg} />
                </View>
                {
                    img && <AppButton classname={" rounded-full w-36"} icon={"arrow-up-bold"} onPress={AppAlert}>uploade</AppButton>
                }
            </View>
        )
    }
}

export default UpdateImageScreen
