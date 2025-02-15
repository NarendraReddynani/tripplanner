import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  WHITE: '#fff',
  GREY: '#808080',
  SKYBLUE: '#00aaff',
};

const BACKGROUND_COLORS = {
  solo: ['#ff6b6b', '#ff8e8e'], // Reddish gradient for solo
  couple: ['#ff9a9e', '#fad0c4'], // Pinkish for couple
  family: ['#38ef7d', '#11998e'], // Greenish for family
  friends: ['#f7b733', '#fc4a1a'], // Yellowish-orange for friends
};

export default function OptionsCard({ option, selectedOption }) {
  const isSelected = selectedOption?.id === option?.id;
  const isBlurred = selectedOption && selectedOption?.id !== option?.id;

  return (
    <LinearGradient
      colors={BACKGROUND_COLORS[option.type] || ['#ddd', '#aaa']}
      style={[
        {
          padding: 25,
          borderRadius: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: isBlurred ? 0.4 : 1, // Blur effect only after selection
          borderWidth: isSelected ? 5 : 0,
          borderColor: isSelected ? COLORS.SKYBLUE : 'transparent',
        },
      ]}
    >
      <View>
        <Text style={{ fontSize: 20, fontFamily: 'Bold' }}>{option.title}</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Bold', color: COLORS.GREY }}>
          {option.desc}
        </Text>
      </View>
      <Text style={{ fontSize: 35 }}>{option.icon}</Text>
    </LinearGradient>
  );
}
