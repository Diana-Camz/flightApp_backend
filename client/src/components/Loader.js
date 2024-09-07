import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = ({height}) => {
  return ( 
    <View style={[styles.activityIndicator, {height: height}]}>
        <ActivityIndicator size='large' color={'#d5b0ee'}/>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    activityIndicator: {
        //height: 550,
        justifyContent: 'center',
    },
})