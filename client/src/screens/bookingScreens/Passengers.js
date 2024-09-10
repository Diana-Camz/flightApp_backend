import { StyleSheet, Text, View,  } from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import ButtonNext from '../../components/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';

const Passengers = ({route, navigation}) => {
  const [passengers, setPassengers] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const {origin, destiny, day} = route.params;

  const addPassengers = () => {
    setPassengers(passengers + 1)
  }

  const removePassengers = () => {
    if(passengers <= 1){
      return
    } else {
      setPassengers(passengers - 1)
    }
  }

  const handleSendData = () => {
    navigation.navigate('Confirm', {origin: origin, destiny: destiny, day: day, passengers: passengers})
  }
  return (
    <View style={styles.container}>
      <Ionicons name={'arrow-back'} size={30} style={styles.icon} onPress={() => navigation.goBack()}/>
      <FlightInfo 
        origin={origin} 
        destiny={destiny}
        dateDeparture={day}
        passengers={passengers}
      />
      <View style={styles.title_container}>
        <Text style={styles.title}>How many passengers?</Text>
      </View>

      <View style={styles.input_container}>
      <Ionicons name={'remove-circle-sharp'} size={40} style={styles.icon} onPress={removePassengers}/>
      <Text style={styles.input_text}>{passengers}</Text>
      <Ionicons name={'add-circle-sharp'} size={40} style={styles.icon} onPress={addPassengers}/>
      </View>

      <View style={styles.button_container}>
        <ButtonNext title={'Next'} onPress={handleSendData} isActive={isActive}/>
      </View>
    </View>
  )
}

export default Passengers

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
    width: 200,
  },
  icon: {
    marginTop: 20,
    color: '#9700FF'
  },
  title_container: {
    paddingHorizontal: 20,
    marginTop: 80,
  },
  input_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  input_text: {
    width: 80,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontSize: 40,
    fontWeight: '600',
    borderBottomWidth: 1,
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})