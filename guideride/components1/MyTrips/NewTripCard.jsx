import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';


const COLORS = {
    PRIMARY: '#000', 
    WHITE: '#fff',
    DARK: '#333', 
    GREY: '#474a47',
    GREEN:'#1ee61e'
};

export default function NewTripCard() {

    const router=useRouter();
  return (
    <View style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        gap:20
    }}><FontAwesome5 name="map-marked-alt" size={40} color="black" />
      <Text style={{
        fontSize:20,
        fontFamily:'Bold'
      }}>No Trip Planned yet</Text>
      <Text style={{
        fontFamily:'Medium',
        fontSize:20,
        textAlign:'center',
        color:COLORS.GREY
      }}>add a trip make your soul set free </Text>

      <TouchableOpacity onPress={()=>router.push('/create-trip/searchplace')}
      style={{
        padding:20,
        backgroundColor:COLORS.PRIMARY,
        borderRadius:20,
        paddingHorizontal:50,
        marginTop:40
      }} >
        <Text style={{
            color:COLORS.WHITE,
            fontFamily:'Bold',
            fontSize:20
        }}>
            start a new trip
        </Text>

      </TouchableOpacity>
    </View>
  )
}