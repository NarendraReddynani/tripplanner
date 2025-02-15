import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import NewTripCard from '../../components1/MyTrips/NewTripCard';
import { useRouter } from 'expo-router';
import { authentication, db } from '../../configs/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import UserTripList from '../../components1/MyTrips/userTripList';

const COLORS = {
  PRIMARY: '#000',
  WHITE: '#fff',
  DARK: '#333',
  GREY: '#808080'
};

export default function MyTrip() {
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [userTrips, setUserTrips] = useState([]);
  const user = authentication.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (user && user.email) {
      GetMyTrips();
    }
  }, [user]);

  const GetMyTrips = async () => {
    try {
      setLoading(true); // Start loading before fetching
      console.log("Fetching trips for user:", user?.email);

      const q = query(collection(db, 'userTrips'), where('userEmail', '==', user?.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No trips found for user.");
      }

      const trips = [];
      querySnapshot.forEach((doc) => {
        console.log("Trip ID:", doc.id, "=>", doc.data());
        trips.push({ id: doc.id, ...doc.data() }); 
      });

      setUserTrips(trips);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 55, backgroundColor: COLORS.WHITE, height: '100%' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', display: 'flex' }}>
        <Text style={{ fontFamily: 'Bold', fontSize: 40 }}>MY Trips</Text>
        <Feather name="plus-circle" size={24} color="black" />
      </View>

      {loading && <ActivityIndicator size={'large'} color={COLORS.PRIMARY} />}

      {userTrips.length === 0 ? <NewTripCard /> : <UserTripList trips={userTrips} />}
    </View>
  );
}
