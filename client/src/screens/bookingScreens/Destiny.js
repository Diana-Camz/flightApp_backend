import {StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import data from '../../airports_data/airports.data'
import ButtonNext from '../../components/ButtonNext';
import FlightInfo from '../../components/booking/FlightInfo';

const Destiny = ({route, navigation}) => {
  const [destiny, setDestiny] = useState('')
  const [isActive, setIsActive] = useState(false)
  const {origin} = route.params;

  useEffect(() =>{
    if(destiny.length >= 1){
      setIsActive(true)
    }else{
      setIsActive(false)
    }}, [destiny])

  const handleSendData = () => {
    navigation.navigate('Dates', {origin: origin, destiny: destiny})
  }
  return (
    <View style={styles.container}>
      <Ionicons name={'arrow-back'} size={30} style={styles.icon} onPress={() => navigation.goBack()}/>
      <FlightInfo 
        origin={origin} 
        destiny={destiny}
        dateDeparture={''}
        passengers={0}
      />
      <View style={styles.input_container}>
        <Text style={styles.title}>Where will you be flying to?</Text>
        <SelectList 
          setSelected={(val) => setDestiny(val)} 
          data={data} 
          save="value"
          placeholder='Select your airport'
        />
      </View>
      <View style={styles.button_container}>
        <ButtonNext title={'Next'} onPress={handleSendData} isActive={isActive}/>
      </View>
    </View>
  )
}

export default Destiny

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
    width: 250,
    marginBottom: 30,
  },
  icon: {
    marginTop: 20,
    color: '#9700FF'
  },
  input_container: {
    paddingHorizontal: 20,
    marginTop: 80,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#7c7c7c',
    marginTop: 60,
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
})