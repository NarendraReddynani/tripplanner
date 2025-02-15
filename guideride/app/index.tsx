import { View } from "react-native";
import { Text } from "react-native";
import Login from "../components1/Login";
import { useLayoutEffect } from "react";
import { Redirect, useNavigation } from "expo-router";
import { authentication } from '../configs/firebase';
import 'react-native-get-random-values';
  // Ensure correct Firebase config import

export default function HomeScreen() {
  const user=authentication.currentUser;

  const navigation=useNavigation();

 
  return (
    <View
     style={{
      flex:1,
    }}
    >
      {user?
      <Redirect href={"./mytrip"}/>:
      <Login/>
      }
      
    </View>

  );
}
