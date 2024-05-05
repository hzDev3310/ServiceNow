import React, { useState } from 'react';
import AppUpdateModel from './AppUpdateModel';
import AppUpdateInput from './AppUpdateInput';
import AppUpdateSelecet from './AppUpdateSelecet';
import { useNavigation } from '@react-navigation/native';
import { locations } from '../storage';
import { Text, View } from 'react-native';
import { verifyName } from '../verficationInputs';


const AppUpdateUserCard = ({ user }) => {
    const navigation = useNavigation();
    const [openModel, setOpenModel] = useState(null);

    const handleModelToggle = (model) => {
        setOpenModel(openModel === model ? null : model);
    };
    const handleButtonClick = () => {
        console.log("Button clicked in ParentComponent");
      };
    return (
        <View className="px-2">
            <Text className="ml-1 text-lg font-semibold mb-2" style={{ color: colors.primary }}>
                Edit your personal information
            </Text>
            <AppUpdateModel
                icon="account"
                label={`name : ${user.name}`}
                isOpen={openModel === 'name'}
                toggleModel={() => handleModelToggle('name')}>
                <AppUpdateInput   label="name" icon="account" attribute="name" user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel
                isOpen={openModel === 'phoneNumber'}
                icon="phone"
                label={`phone number : ${user.phoneNumber.number}`}
                toggleModel={() => handleModelToggle('phoneNumber')}>
                <AppUpdateInput label="phone Number" icon="phone" attribute="number" user={user._id} />
            </AppUpdateModel>
            {user.email && (
                <AppUpdateModel
                    isOpen={openModel === 'email'}
                    icon="email"
                    label={`email : ${user.email.emailAddress}`}
                    toggleModel={() => handleModelToggle('email')}>
                    <AppUpdateInput label="email" icon="email" attribute="email" user={user._id} />
                </AppUpdateModel>
            )}
            <AppUpdateModel
                isOpen={openModel === 'password'}
                icon="key"
                label="change your password"
                toggleModel={() => handleModelToggle('password')}>
                <AppUpdateInput label="password" icon="key" attribute="password" user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel
                isOpen={openModel === 'location'}
                icon="map-marker"
                label="change your location"
                toggleModel={() => handleModelToggle('location')}>
                <AppUpdateSelecet data={locations} label="location" attribute="location" user={user._id} />
            </AppUpdateModel>
            <AppUpdateModel
                isOpen={openModel === 'profilePicture'}
                icon="image-edit"
                label="change your profile picture"
                toggleModel={() => {
                    navigation.navigate('updateImage', {
                        attribute: 'profilPic',
                        label: 'Are you sure you want to change your profile picture?',
                    });
                    setOpenModel(null)
                }}

            />
        </View>
    );
};

export default AppUpdateUserCard;
