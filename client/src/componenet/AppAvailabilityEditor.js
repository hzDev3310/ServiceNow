import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import AppText from './AppText';
import colors from '../colors';
import AppButton from './AppButton';
import useUpdate from '../apis/useUpdate';

const AppAvailabilityEditor = ({user}) => {
    
    const { error, isLoading, responseData, updateData } = useUpdate()
    const handelUpdate = () => {
        updateData(`/users/${user}/availability`, { value :availability })
    }

    useEffect(() => {
        responseData && alert(responseData.message)
        error && alert("check your internt connection")
    }, [error, responseData])

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
            }
        }));
        setAvailability((prevAvailability) => ({
            ...prevAvailability,
            isAvailable: false
        }));
    };

    const AppAlert = () =>
        Alert.alert('', 'Are you sure! you want to update your availbelty ' , [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: handelUpdate
            },
        ]);


    const handleAvailabilityChange = () => {
        const updatedAvailability = {
            isAvailable: !availability.isAvailable,
            days: {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true
            }
        };


        for (const day in availability.days) {
            updatedAvailability.days[day] = !availability.isAvailable;
        }

        setAvailability(updatedAvailability);
    };

    return (
        <View >
            <AppText style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: colors.primary }}>
                Select the days you want to work
            </AppText>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Checkbox
                    value={availability.isAvailable}
                    onValueChange={handleAvailabilityChange}
                    color={availability.isAvailable ? colors.primary : colors.secondary}
                />
                <AppText style={{ marginLeft: 5 }}>Select all days</AppText>
            </View>
            {Object.entries(availability.days).map(([day, isChecked]) => (
                <View key={day} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={() => handleDayChange(day)}
                        color={isChecked ? colors.primary : colors.secondary}
                    />
                    <AppText style={{ marginLeft: 5 }}>{day.charAt(0).toUpperCase() + day.slice(1)}</AppText>
                </View>
            ))}
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <AppButton classname={"w-28"}  onPress={() => AppAlert()} style={{ width: 100 }}>Update</AppButton>
            </View>
        </View>
    );
};

export default AppAvailabilityEditor;
