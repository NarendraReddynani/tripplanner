import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  WHITE: '#fff',
  GREY: '#808080',
  SKYBLUE: '#00aaff',
};

const BUDGET_COLORS = {
  low: ['#FF5733', '#C70039'],      // Red gradient
  moderate: ['#FFD700', '#FF8C00'], // Gold-orange gradient
  luxury: ['#1E90FF', '#00008B'],   // Deep blue gradient
};

export default function BudgetOptionsCard({ option, selectedOption }) {
  console.log('Option:', option); // Debugging
  console.log('Option Type:', option?.type); // Debugging

  const isSelected = selectedOption?.id === option?.id;
  const isBlurred = selectedOption && selectedOption?.id !== option?.id;

  return (
    <LinearGradient
      colors={BUDGET_COLORS[option.type] || ['#ddd', '#aaa']}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={{
        padding: 30,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: isBlurred ? 0.5 : 1,
        borderWidth: isSelected ? 3 : 0,
        borderColor: isSelected ? COLORS.SKYBLUE : 'transparent',
        shadowColor: isSelected ? COLORS.SKYBLUE : 'transparent',
        shadowOpacity: isSelected ? 0.8 : 0,
        shadowRadius: isSelected ? 10 : 0,
        elevation: isSelected ? 8 : 2,
      }}
    >
      <View>
        <Text style={{ fontSize: 24, fontFamily: 'Bold', color: COLORS.WHITE }}>{option.title}</Text>
        <Text style={{ fontSize: 18, fontFamily: 'Bold', color: COLORS.GREY }}>{option.desc}</Text>
      </View>
      <Text style={{ fontSize: 40 }}>{option.icon}</Text>
    </LinearGradient>
  );
}
