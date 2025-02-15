import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { SelectBudgetOptions } from '../../constants/options';
import BudgetOptionsCard from '../../components1/CreateTrip/OptionsCard';
import CreateTripContext from '../../context/CreateTripContext';

const COLORS = {
  PRIMARY: '#000',
  WHITE: '#fff',
  DARK: '#333',
  GREY: '#474a47',
  SKYBLUE: '#00aaff',
};

export default function Budget() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router=useRouter()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  useEffect(() => {
    setTripData({
      ...tripData,
      budget: selectedOption?.title
    })

  }, [selectedOption])

  const onclickContinue=()=>{
    if(!selectedOption){
      ToastAndroid.show('select your budget',ToastAndroid.LONG)
    }
    router.push('/create-trip/reviewtrip') 
  }

  return (
    <View style={{ padding: 15, height: '100%', paddingTop: 75, backgroundColor: COLORS.WHITE }}>
      <Text style={{ fontSize: 35, fontFamily: 'Bold', marginTop: 10, paddingBottom: 10, textAlign: 'center' }}>
        Budget
      </Text>

      <View>
        <Text style={{ fontSize: 18, fontFamily: 'Bold', marginBottom: 15 }}>
          Choose the spending level you prefer
        </Text>

        <FlatList
          data={SelectBudgetOptions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedOption(item)} style={{ marginVertical: 10 }}>
              <BudgetOptionsCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )}
        />

      </View>

      <TouchableOpacity onPress={onclickContinue} style={{
        padding: 15,
        backgroundColor: COLORS.PRIMARY,
        marginTop: 60,
        borderRadius: 15,
        width: '100%'

      }}>
        {/* <Link href={''} style={{ textAlign: 'center', width: '100%' }}> */}
        <Text style={{
          textAlign: 'center',
          color: COLORS.WHITE,

          fontFamily: 'Bold',
          fontSize: 25
        }}>continue</Text>


      </TouchableOpacity>

    </View>
  );
}
