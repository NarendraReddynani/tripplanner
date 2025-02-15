import { View, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import CreateTripContext from '../../context/CreateTripContext';
import { useNavigation, useRouter } from 'expo-router';

const COLORS = {
  PRIMARY: '#000',
  WHITE: '#fff',
  DARK: '#333',
  GREY: '#474a47',
  SKYBLUE: '#00aaff', // Sky blue for glow effect
  GREEN: '#1ee61e',
};

function SearchPlace() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [isFocused, setIsFocused] = useState(false); // State to track focus
  const router = useRouter();

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTrasparent: true,
      headerTitle: 'search'
    })
  }, [])

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const GOOGLE_API_KEY = Constants.expoConfig?.extra?.googleApiKey;

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for a place..."
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(details?.geometry?.location);
          setTripData({
            locationInfo: {
              name: data.description,
              coordinates: details?.geometry?.location,
              photoRef: details?.photos?.[0]?.photo_reference,
              url: details?.url,
            },
          });
          router.push('/create-trip/selectTraveler')


        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        styles={{
          container: {
            width: '100%',
          },
          textInputContainer: {
            width: '100%',
            borderRadius: 15,
            backgroundColor: COLORS.WHITE,
            padding: 5,
            elevation: isFocused ? 5 : 2, // Add shadow when focused
          },
          textInput: {
            backgroundColor: '#f9f9f9',
            height: 50,
            borderRadius: 10,
            paddingHorizontal: 15,
            fontSize: 16,
            color: COLORS.DARK,
            borderWidth: 2,
            borderColor: isFocused ? COLORS.SKYBLUE : COLORS.GREY, // Glowing effect
            shadowColor: COLORS.SKYBLUE,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isFocused ? 0.8 : 0.3,
            shadowRadius: isFocused ? 5 : 2,
            elevation: isFocused ? 6 : 3, // Android shadow effect
          },
          listView: {
            backgroundColor: COLORS.WHITE,
            borderRadius: 10,
            marginTop: 5,
            elevation: 5, // Adds shadow to dropdown
          },
          row: {
            padding: 10,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.WHITE,
          },
          separator: {
            height: 1,
            backgroundColor: '#c8c7cc',
          },
        }}
        textInputProps={{
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 25,
    backgroundColor: COLORS.WHITE,
  },
});

export default SearchPlace;
