import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ButtonNext from '../../components/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { saveFlight } from '../../api/api';

const Confirm = ({route, navigation}) => {

  const [loading, setLoading] = useState(false)
  const [isActive, setIsActive] = useState(true);
  const {origin, destiny, day, passengers, user_id} = route.params;
  const [newFlight, setNewFlight] = useState({
    origin: origin,
    destiny: destiny,
    date: day,
    passengers: passengers,
    user_id: user_id,
    createdAt: new Date(),
  })

  const onSendData = async () => {
    setLoading(true)
    try {
      const response = await saveFlight(newFlight);
      if(response.status == "ok"){
        Alert.alert('Saved flight', 'Your flight has been booked correctly', [
          {text: 'Ok', onPress: () => navigation.navigate('Home', {user_id: user_id})}
        ])
      } else {
        Alert.alert('Error', 'There has been an error with your flight reservation, please try again.', [
          {text: 'Try Again', onPress: () => navigation.navigate('Home', {user_id: user_id})}
        ])
      }

    } catch (error) {
      console.log(error, 'error sending new flight')
    }
    setLoading(false)
  }

  const cancelRequest = () => {
    navigation.navigate('Home', {user_id: user_id})
  }

  if(loading) {
    return (
    <Loader height={850}/>
    )
  }

  return (
    <View style={styles.container}>
      <FlightInfo 
        origin={origin} 
        destiny={destiny}
        dateDeparture={day}
        passengers={passengers}
      />
      <View style={styles.title_container}>
        <Text style={styles.title}>Your request was received</Text>
      </View>

      <View style={styles.button_container}>
        <ButtonNext title={'Confirm'}  onPress={onSendData} isActive={isActive}/>
        <Button title={'Cancel'}  onPress={cancelRequest}/>
      </View>
    </View>
  )
}

export default Confirm

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 100,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#48345c',
    width: 200,
  },
  title_container: {
    paddingHorizontal: 20,
    marginTop: 80,
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})