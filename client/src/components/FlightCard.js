import {StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const FlightCard = ({origin, destiny, date, passengers}) => {
  return (
    <View style={styles.container}>
        <View style={styles.mainInfo_container}>
            <View style={styles.origin_container}>
              <Text style={[styles.city_title, {textAlign: 'left'}]}>{origin.slice(-3)}</Text>
              <Text style={[styles.city_subtitle, {textAlign: 'left'}]}>{origin.slice(0,-6)}</Text>
            </View>
            <Ionicons name='airplane' size={30} color={'#9700FF'} style={styles.icon}/>
            <View style={styles.destiny_container}>
              <Text style={[styles.city_title, {textAlign: 'right'}]}>{destiny.slice(-3)}</Text>
              <Text style={[styles.city_subtitle, {textAlign: 'right'}]}>{destiny.slice(0,-6)}</Text>
            </View>
        </View>
        <View style={styles.detailsInfo_container}>
            <Text style={[styles.detailsInfo_text, {textAlign: 'right'}]}>{date}</Text>
            <Text style={[styles.detailsInfo_text, {textAlign: 'left'}]}>{passengers == 1 ? `${passengers} passenger` : `${passengers} passengers`}</Text>
        </View>
    </View>
  )
}

export default FlightCard

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#b9b9b9',
    borderRadius: 15,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mainInfo_container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    borderBottomWidth: 0.6,
    borderBottomColor: '#bebebe',
  },
  detailsInfo_container: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  city_title: {
    fontSize: 30,
    fontWeight: '900',
  },
  city_subtitle: {
    color: '#7C7C7C',
    marginBottom: 5,
    fontSize: 15,
  },
  icon: {
    position: 'absolute',
    paddingLeft: 160,
    paddingTop: 10,
  },
  detailsInfo_text: {
    fontWeight: '700',
    marginTop: 5,
    color: '#3b3a3a',
  },
})