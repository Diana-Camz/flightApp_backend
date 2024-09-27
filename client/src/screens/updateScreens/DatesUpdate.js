import {Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {Calendar} from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import ButtonNext from '../../components/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';
import {format, parseISO} from 'date-fns'
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import {useFlight} from '../../hooks/useFlight'
import { updateFlight } from '../../api/api';

const DatesUpdate = ({route, navigation}) => {
  const {id, user_id} = route.params;
  const [isActive, setIsActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const {flight, loading, setFlight} = useFlight(id)
  const currentDay = new Date().toISOString().split('T')[0];


  const formatDate = (date) => {
    return format(date, 'MMMM d, yyyy')
  }

  const onDayPress = (day) => {
    const newDate = day.dateString;
    setSelectedDate(newDate);
    const formattedDate = newDate ? formatDate(parseISO(newDate)) : '';
    setFlight(prevFlight => ({...prevFlight, date: formattedDate}));
    setIsActive(true);
    } 

  const handleEditData = async (id) => {
    try {
        //const formattedDate = selectedDate ? formatDate(parseISO(selectedDate)) : '';
        const response = await updateFlight(id, {date: flight.date})
        if(response.status == "ok"){
          Alert.alert('Flight updated', 'The flight has been updated successfully', [
            {text: 'Ok', onPress: () => navigation.navigate('Home', {user_id: user_id})}
          ])
        } else {
          Alert.alert('Error', 'The flight has not been updated correctly, please try again', [
            {text: 'Try Again', onPress: () => navigation.goBack()}
          ])
        }
    } catch (error) {
      console.error('data cannot be updated in DatesUpdate.js', error)
    }
  }

  if(loading) {
    return (
    <Loader height={850}/>
    )
  }

  return (
    <View style={styles.container}>
      <Ionicons name={'arrow-back'} size={30} style={styles.icon} onPress={() => navigation.goBack()}/>
      <FlightInfo 
        origin={flight.origin} 
        destiny={flight.destiny}
        dateDeparture={flight.date}
        passengers={flight.passengers}
      />
      <View style={styles.input_container}>
        <Text style={styles.title}>Edit your flight date</Text>
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
        <ButtonNext title={'Save'} onPress={() => handleEditData(id)} isActive={isActive}/>
        <Button title={'Cancel'} onPress={() => navigation.goBack()}/>
      </View>
    </View>
  )
}

export default DatesUpdate

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
