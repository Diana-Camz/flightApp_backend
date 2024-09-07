import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Button = ({title, onPress}) => {
  return (
    <View style={styles.container}>
        <Pressable 
            onPress={onPress} 
            style={styles.button_container}>
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    button_container: {
        width: 290,
        height: 43,
        borderWidth: 1.5,
        borderColor: '#9700FF',
        borderRadius: 8,
        justifyContent: 'center',
    },
    title: {
        color: '#9700FF',
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
})