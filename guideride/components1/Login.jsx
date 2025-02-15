import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Login() {
  const router = useRouter();
  
  return (
    <View>
      <Image 
        source={require('./../assets/images/trip1.jpeg')}
        style={{
          width: '100%',
          height: 550
        }}
      />
      
      <View style={styles.container}>
        <Text style={{
          fontSize: 40,
          fontFamily: 'Bold',
          textAlign: 'center',
          color: Colors.WHITE
        }}>
          AI Travel Planner
        </Text>

        <Text style={{
          fontSize: 15,
          textAlign: 'center',
          color: Colors.WHITE,
          marginTop: 30
        }}>
          Welcome to my app, experience the range of planning using AI
        </Text>

        {/* ✅ Corrected TouchableOpacity tag */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('auth/signin')}
        >
          <Text style={{
            color: Colors.PRIMARY,
            textAlign: 'center',
            fontFamily: 'Bold',
            fontSize: 20
          }}>
            GET STARTED
          </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    marginTop: -70,
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  },
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    fontFamily: 'Bold',
    marginTop: '15%'
  }
});
