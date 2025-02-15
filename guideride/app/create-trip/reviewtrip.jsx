import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CreateTripContext from '../../context/CreateTripContext';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';

const COLORS = {
    PRIMARY: '#007bff',  // A more vibrant blue
    WHITE: '#fff',
    DARK: '#222',
    GREY: '#6c757d',
    SKYBLUE: '#00aaff',
    GREEN: '#1ee61e',
};

export default function reviewtrip() {
    const navigation = useNavigation();
    const router=useRouter()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, []);

    

    const { tripData } = useContext(CreateTripContext);

    return (
        <View style={{ padding: 20, height: '100%', paddingTop: 75, backgroundColor: COLORS.WHITE }}>
            <Text style={{
                fontFamily: 'Bold',
                fontSize: 28,
                color: COLORS.PRIMARY,
                textTransform: 'capitalize',
                textAlign: 'center',
                marginBottom: 10,
            }}>Trip Review</Text>

            <Text style={{
                fontFamily: "Bold",
                fontSize: 22,
                color: COLORS.DARK,
                textAlign: 'center',
                marginBottom: 20,
            }}>Please review your selections</Text>

            <View style={{ marginTop: 10 }}>
                {/* Destination */}
                <View style={styles.infoContainer}>
                    <MaterialCommunityIcons name="map-marker-radius" size={28} color={COLORS.SKYBLUE} />
                    <View>
                        <Text style={styles.label}>Destination</Text>
                        <Text style={styles.value}>{tripData?.locationInfo?.name}</Text>
                    </View>
                </View>

                {/* Travel Date */}
                <View style={styles.infoContainer}>
                    <MaterialCommunityIcons name="calendar-month-outline" size={28} color={COLORS.GREEN} />
                    <View>
                        <Text style={styles.label}>Travel Date</Text>
                        <Text style={styles.value}>
                            {moment(tripData?.startDate).format('DD MMM')} - {moment(tripData?.endDate).format('DD MMM')} ({tripData?.totalNoOfDays} days)
                        </Text>
                    </View>
                </View>

                {/* Travelers */}
                <View style={styles.infoContainer}>
                    <MaterialCommunityIcons name="account-group-outline" size={28} color={COLORS.PRIMARY} />
                    <View>
                        <Text style={styles.label}>Traveling Members</Text>
                        <Text style={styles.value}>{tripData?.traveler?.title}</Text>
                    </View>
                </View>

                {/* Budget */}
                <View style={styles.infoContainer}>
                    <MaterialCommunityIcons name="cash-multiple" size={28} color="gold" />
                    <View>
                        <Text style={styles.label}>Budget</Text>
                        <Text style={styles.value}>₹ {tripData?.budget}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={()=>router.push('/create-trip/generatetrip')} style={{
                padding: 15,
                backgroundColor: COLORS.PRIMARY,
                marginTop: 60,
                borderRadius: 15,
                width: '100%'

            }}>
                {/* <Link href={''} style={{ textAlign: 'center', width: '100%' }}> */}
                <Text style={{
                    textAlign: 'center',
                    color: COLORS.WHITE,

                    fontFamily: 'Bold',
                    fontSize: 25
                }}>BUILD TRIP</Text>


            </TouchableOpacity>

        </View>
    );
}

const styles = {
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 25,
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontFamily: 'Bold',
        fontSize: 18,
        color: COLORS.GREY,
    },
    value: {
        fontFamily: 'Bold',
        fontSize: 20,
        color: COLORS.DARK,
    },
};
