import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import CreateTripContext from "./../context/CreateTripContext";
import { useState } from "react";
import { Text } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Bold: require("./../assets/fonts/Cormorant-Bold.ttf"),
    Medium: require("./../assets/fonts/Cormorant-Medium.ttf"),
    Regular: require("./../assets/fonts/Cormorant-Regular.ttf"),
    SpaceMono: require("./../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [tripData, setTripData] = useState([]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CreateTripContext.Provider>
  );
}
