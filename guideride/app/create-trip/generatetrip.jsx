import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import CreateTripContext from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/options';
import { useRouter } from 'expo-router';

import { doc, setDoc } from "firebase/firestore";
import { authentication, db } from '../../configs/firebase';
import { chatSession } from '../../configs/AIModal'; // Ensure correct import

const COLORS = {
  PRIMARY: '#007bff',
  WHITE: '#fff',
  DARK: '#222',
  GREY: '#6c757d',
  SKYBLUE: '#00aaff',
};

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GeneraAiTrip();
  }, []);

  const GeneraAiTrip = async () => {
    if (!tripData) {
      console.error("❌ No trip data found!");
      return;
    }

    setLoading(true);

    const user = authentication.currentUser;
    if (!user || !user.email) {
      console.error("❌ User not authenticated!");
      setLoading(false);
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', tripData?.locationInfo?.name || "Unknown Location")
      .replace('{totalDays}', tripData?.totalNoOfDays || "0")
      .replace('{totalNight}', (tripData?.totalNoOfDays - 1) || "0")
      .replace('{traveler}', tripData?.traveler?.title || "Traveler")
      .replace('{budget}', tripData?.budget || "Unknown");

    try {
      console.log("🔹 Sending AI request...");
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const textResponse = await result.response.text();

      console.log("✅ AI Response:", textResponse);

      let tripResp;
      try {
        tripResp = JSON.parse(textResponse);
      } catch (error) {
        console.error("❌ Error parsing AI response:", error);
        setLoading(false);
        return;
      }

      const docId = Date.now().toString();

      console.log("📝 Saving trip to Firestore...");
      await setDoc(doc(db, "userTrip", docId), {
        userEmail: user.email,
        tripPlan: tripResp,
        tripData: JSON.stringify(tripData),
        docId:docId,
        createdAt: new Date().toISOString(),
      });

      console.log("✅ Trip saved successfully!");

      // Navigate after saving
      router.push('/mytrip');
    } catch (error) {
      console.error("❌ Error in GeneraAiTrip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please Wait...</Text>
      <Text style={styles.subHeader}>Generating Your Trip</Text>

      <Image
        source={require('../../assets/images/loading.gif')}
        style={styles.gif}
      />

      <Text style={styles.footer}>
        Do not go back, wait for the process to complete.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.DARK,
    marginBottom: 30,
  },
  gif: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  footer: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.GREY,
    marginTop: 20,
    fontWeight: '500',
    lineHeight: 25,
  },
});
