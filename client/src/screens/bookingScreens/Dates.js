import {StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {Calendar} from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import ButtonNext from '../../components/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';
import {format, parseISO} from 'date-fns'

const Dates = ({route, navigation}) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedDate, setSelectedDay] = useState('');
  const currentDay = new Date().toISOString().split('T')[0];
  const {origin, destiny} = route.params;

  const onDayPress = (day) => {
    setSelectedDay(day.dateString)
    setIsActive(true)
  } 

  const formatDate = (date) => {
    return format(date, 'MMMM d, yyyy')
  }
  const formattedDate = selectedDate ? formatDate(parseISO(selectedDate)) : '';

  const handleSendData = () => {
    navigation.navigate('Passengers', {origin: origin, destiny: destiny, day: formattedDate})
  }

  return (
    <View style={styles.container}>
      <Ionicons name={'arrow-back'} size={30} style={styles.icon} onPress={() => navigation.goBack()}/>
      <FlightInfo 
        origin={origin} 
        destiny={destiny}
        dateDeparture={formattedDate}
        passengers={0}
      />
      <View style={styles.input_container}>
        <Text style={styles.title}>Select Date</Text>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{[selectedDate]: {
            selected: true,
            selectedColor: '#9700FF',
          }}}
          minDate={currentDay}
          disableAllTouchEventsForDisabledDays={true}
          theme={{
            todayTextColor: 'white',
            todayBackgroundColor: '#391e69',
            arrowColor: '#9700FF',
          }}
/>
      </View>
      <View style={styles.button_container}>
        <ButtonNext title={'Next'} onPress={handleSendData} isActive={isActive}/>
      </View>
    </View>
  )
}

export default Dates

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#48345c',
  },
  icon: {
    marginTop: 20,
    color: '#9700FF'
  },
  input_container: {
    paddingHorizontal: 20,
    marginTop: 80,
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})
