import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ButtonNext = ({title, onPress, isActive}) => {
  return (
    <View style={styles.container}>
        <Pressable 
            disabled={!isActive}
            onPress={onPress} 
            style={[styles.button_container, {backgroundColor: isActive ? '#9700FF' : '#969595',}]}>
            <Text style={[styles.title, {color: isActive ? '#ffffff' : '#c5c5c5',}]}>{title}</Text>
        </Pressable>
    </View>
  )
}

export default ButtonNext

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 12,
    },
    button_container: {
        width: 290,
        height: 43,
        borderRadius: 8,
        justifyContent: 'center',
    },
    title: {
        color: '#c5c5c5',
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})