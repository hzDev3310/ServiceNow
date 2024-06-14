import React, { useEffect, useState } from 'react';
import { Alert, View, Switch } from 'react-native';
import AppText from './AppText';
import colors from '../colors';
import AppButton from './AppButton';
import useUpdate from '../apis/useUpdate';

const AppAvailabilityEditor = ({ user }) => {
    const { error, responseData, updateData } = useUpdate();

    const handleUpdate = () => {
        updateData(`/users/${user}/availability`, { value: availability });
    };

    useEffect(() => {
        if (responseData) alert(responseData.message);
        if (error) alert("Check your internet connection");
    }, [error, responseData]);

    const [availability, setAvailability] = useState({
        isAvailable: false,
        days: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }
    });

    const handleDayChange = (day) => {
        setAvailability((prevAvailability) => ({
            ...prevAvailability,
            days: {
                ...prevAvailability.days,
                [day]: !prevAvailability.days[day]
            },
            isAvailable: Object.values(prevAvailability.days).some(value => value)
        }));
    };

    const AppAlert = () =>
        Alert.alert('', 'Are you sure you want to update your availability?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: handleUpdate
            },
        ]);

    const handleAvailabilityChange = () => {
        const updatedAvailability = {
            isAvailable: !availability.isAvailable,
            days: {
                monday: !availability.isAvailable,
                tuesday: !availability.isAvailable,
                wednesday: !availability.isAvailable,
                thursday: !availability.isAvailable,
                friday: !availability.isAvailable,
                saturday: !availability.isAvailable,
                sunday: !availability.isAvailable
            }
        };

        setAvailability(updatedAvailability);
    };

    const handleInAvailabilityChange = () => {
        const updatedAvailability = {
            isAvailable: false,
            days: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            }
        };

        setAvailability(updatedAvailability);
    };

    return (
        <View>
            <AppText style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: colors.primary }}>
                Select the days you want to work
            </AppText>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: "space-between", marginBottom: 10 }}>
                <Switch
                    value={!availability.isAvailable}
                    onValueChange={handleInAvailabilityChange}
                    thumbColor={!availability.isAvailable ? colors.primary : colors.secondary}
                />
                <AppText style={{ marginLeft: 5 }}>Not available</AppText>
            </View>
            {Object.entries(availability.days).map(([day, isChecked]) => (
                <View key={day} className='flex flex-row-reverse justify-between items-center'>
                    <Switch
                        value={isChecked}
                        onValueChange={() => handleDayChange(day)}
                        thumbColor={isChecked ? colors.primary : colors.secondary}
                    />
                    <AppText style={{ marginLeft: 5 }}>{day.charAt(0).toUpperCase() + day.slice(1)}</AppText>
                </View>
            ))}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Switch
                    value={availability.isAvailable}
                    onValueChange={handleAvailabilityChange}
                    thumbColor={availability.isAvailable ? colors.primary : colors.secondary}
                />
                <AppText className="font-bold">Select all days</AppText>
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <AppButton onPress={AppAlert} style={{ width: 100 }}>Update</AppButton>
            </View>
        </View>
    );
};

export default AppAvailabilityEditor;
