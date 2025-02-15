import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigation } from 'expo-router';
import { SelectTravelerList } from '../../constants/options';
import OptionsCard from '../../components1/CreateTrip/OptionsCard';
import CreateTripContext from '../../context/CreateTripContext';

const COLORS = {
  PRIMARY: '#000',
  WHITE: '#fff',
  DARK: '#333',
  GREY: '#474a47',
  SKYBLUE: '#00aaff',
  GREEN: '#1ee61e',
};

export default function SelectTraveler() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    setTripData({ ...tripData, traveler: selectedTraveler });
  }, [selectedTraveler]);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: COLORS.WHITE,
        height: '100%',
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily: 'Bold',
          marginTop: 20,
        }}
      >
        Who is traveling?
      </Text>

      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontFamily: 'Bold',
            fontSize: 20,
          }}
        >
          Choose the travelers
        </Text>
      </View>

      <FlatList
        data={SelectTravelerList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedTraveler(item)}
            style={{ marginVertical: 10 }}
          >
            <OptionsCard option={item} selectedOption={selectedTraveler} />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: COLORS.PRIMARY,
          marginTop: 20,
          borderRadius: 15,
        }}
      >
        <Link href={'/create-trip/selectdates'} style={{ textAlign: 'center', width: '100%' }}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.WHITE,
              fontFamily: 'Bold',
              fontSize: 15,
            }}
          >
            Continue
          </Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}
