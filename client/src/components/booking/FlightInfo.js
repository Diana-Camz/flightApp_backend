import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const FlightInfo = ({origin, destiny, dateDeparture, passengers}) => {
  return (
    <View style={styles.container}>
        <View style={styles.mainInfo_container}>
            <View style={styles.origin_container}>
              <Text style={[styles.city_title, {textAlign: 'left'}]}>{origin.slice(-3)}</Text>
              <Text style={[styles.city_subtitle, {textAlign: 'left'}]}>{origin.slice(0,-6)}</Text>
            </View>
            <Ionicons name='airplane' size={25} color={'#9700FF'} style={styles.icon}/>
            <View style={styles.destiny_container}>
              <Text style={[styles.city_title, {textAlign: 'right'}]}>{destiny.slice(-3)}</Text>
              <Text style={[styles.city_subtitle, {textAlign: 'right'}]}>{destiny.slice(0,-6)}</Text>
            </View>
        </View>
        <View style={styles.detailsInfo_container}>
            <Text style={[styles.detailsInfo_text, {textAlign: 'right'}]}>{dateDeparture}</Text>
            {passengers == 0 ? <Text style={[styles.detailsInfo_text, {textAlign: 'left'}]}></Text> : <Text style={[styles.detailsInfo_text, {textAlign: 'left'}]}>{passengers == 1 ? `${passengers} passenger` : `${passengers} passengers`}</Text>}
        </View>
    </View>
  )
}

export default FlightInfo

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 15,
      },
      mainInfo_container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        borderBottomWidth: 0.6,
        borderBottomColor: '#bebebe',
      },
      city_title: {
        fontSize: 25,
        fontWeight: '900',
      },
      city_subtitle: {
        color: '#7C7C7C',
        marginBottom: 5,
        fontSize: 13,
      },
      icon: {
        position: 'absolute',
        paddingLeft: 160,
      },
      detailsInfo_container: {
        flexDirection: 'row',
        justifyContent: "space-between",
      },
      detailsInfo_text: {
        fontWeight: '700',
        marginTop: 5,
        color: '#3b3a3a',
      },
})