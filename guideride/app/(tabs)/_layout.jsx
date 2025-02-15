import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const COLORS = {
  PRIMARY: '#000', 
  WHITE: '#fff',
  DARK: '#333', 
  GREY: '#808080'
};

export default function TabLayout() {
  return (
  <Tabs screenOptions={{
    headerShown:false,
    tabBarActiveTintColor:COLORS.PRIMARY
  }}>
    <Tabs.Screen name="mytrip"
      options={{
        tabBarLabel:'My Trip',
        tabBarIcon:({color})=><FontAwesome6 name="person-walking-luggage" size={27} color="Black" />
      }}
    />
    <Tabs.Screen name="discover"
     options={{
      tabBarLabel:'Discover',
      tabBarIcon:({color})=><MaterialIcons name="travel-explore" size={24} color="black" />
    }}
    />
    <Tabs.Screen name="profile"
     options={{
      tabBarLabel:'My Profile',
      tabBarIcon:({color})=><AntDesign name="profile" size={24} color="black"/>
    }}
    />
  </Tabs>
  )
}