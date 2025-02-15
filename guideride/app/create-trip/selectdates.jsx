import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import CalendarPicker from "react-native-calendar-picker";
import CreateTripContext from '../../context/CreateTripContext';
import moment from 'moment'


const COLORS = {
    PRIMARY: '#000',
    WHITE: '#fff',
    DARK: '#333',
    GREY: '#474a47',
    SKYBLUE: '#00aaff', // Sky blue for glow effect
    GREEN: '#1ee61e',
};

export default function selectdates() {

    const [startDate,setStartDate]=useState()
    const [endDate,setEndDate]=useState()
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router=useRouter();


    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })

    }, [])

    const onDateChange=(date,type)=>{
        console.log(date,type);
        if(type=='START_DATE'){
            setStartDate(moment(date))
        }
        else{
            setEndDate(moment(date))
        }


    }

    const OnDateSelectionContinue=()=>{
        if(!startDate&&!endDate){
            ToastAndroid.show('please select start and end dates',ToastAndroid.LONG)
            return;
        }
        const totalNoOfDays=endDate.diff(startDate,'days')
        console.log(totalNoOfDays+1);
        setTripData({
            ...tripData,
            startDate:startDate,
            endDate:endDate,
            totalNoOfDays:totalNoOfDays+1

        })
        router.push('/create-trip/budget')
    }

    return (
        <View style={{
            padding: 25,
            height: '100%',
            paddingTop: 75,
            backgroundColor: COLORS.WHITE,
            


        }}>
            <Text style={{
                fontSize: 65,
                fontFamily: 'Bold',
                marginTop: 10,
                paddingBottom:30,
                textAlign:'center'
            }}>selectdates</Text>

            <View style={{

                marginTop: 30
            }}><CalendarPicker onDateChange={onDateChange}
                allowRangeSelection={true}
                minDate={new Date()}
                maxRangeDuration={10}
                selectedRangeStyle={{
                    backgroundColor: COLORS.PRIMARY

                }}
                selectedDayTextStyle={{
                    color: COLORS.WHITE
                }}
                /></View>

            <TouchableOpacity onPress={OnDateSelectionContinue} style={{
                padding: 15,
                backgroundColor: COLORS.PRIMARY,
                marginTop: 60,
                borderRadius: 15,
                width:'100%'

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
    )
}