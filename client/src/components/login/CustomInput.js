import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const CustomInput = ({
    value,
    onChangeText,
    placeholder,
    isFocused,
    onFocus,
    onBlur,
    autoCapitalize,
    placeholderTextColor = '#B4B2B2',
    secureTextEntry = false,
    keyboardType = 'default',
    maxLength,
    showError,
    errorMessage,
    isPassword = false,
    onIconPress,
    icon,
    iconStyle
  }) => {
  return (
    <View style={styles.input_container}>
      <TextInput
        style={[styles.input_text, isFocused && styles.isActive]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={maxLength}
      />
      {isPassword && icon && (
        <Ionicons name={icon} size={27} color="#A663CC" style={[styles.iconPassword, iconStyle]} onPress={onIconPress} />
      )}
      {showError ? <Text style={styles.error_text}>{errorMessage}</Text> : <Text style={styles.error_text}></Text> }
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    input_container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      input_text: {
        height: 60,
        width: '100%',
        fontSize: 15,
        color: '#000000',
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderColor: '#DBDADA',
        borderRadius: 8,
      },
      error_text: {
        fontSize: 10,
        width: '100%',
        paddingLeft: 11,
        color: '#CD3939',
        marginBottom: 5,
      },
      isActive: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#444444',
      },
      iconPassword: {
        position: 'absolute',
        paddingRight: 12,
        paddingBottom: 17,
        right: 5,
      },
})