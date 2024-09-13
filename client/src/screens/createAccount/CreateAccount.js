import { StyleSheet, Text, View, TextInput, Alert, ScrollView } from 'react-native'
import React, {useState} from 'react'
import ButtonNext from '../../components/ButtonNext';
import CustomInput from '../../components/login/CustomInput';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import {createUser} from '../../api/api'

const CreateAccount = ({navigation}) => {
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [validEntries, setValidEntries] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validRePassword, setValidRePassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedLastName, setIsFocusedLastName] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [isFocusedRePass, setIsFocusedRePass] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [rePasswordVisible, setRePasswordVisible] = useState(true);

  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  })

  const handleValidation = () => {
      if(newUser.name && newUser.lastname && newUser.email && newUser.password && rePassword){
        setValidEntries(false)
        setValidRePassword(false)
        if(newUser.password.length >= 6) {
          setValidPassword(false)
          if(newUser.password === rePassword){
            handleRegister()
          }else {
          setValidRePassword(true)
        }
        }else {
          setValidPassword(true)
        }
      }else {
        setValidEntries(true)
        }
  }

  const handleRegister = async () => {
    setLoading(true);
    try {
      createUser(newUser);
      Alert.alert('Account created', 'Please log in with your account', [
        {text: 'Ok', onPress: () => navigation.navigate('Login')}
        ])
    } catch(err) {
        // if(err.code === 'auth/email-already-in-use'){
        //      setValidEmail(true)
        //       setEmailMessage('Email already in use')
        //     }
        //     if(err.code === 'auth/invalid-email'){
        //       setValidEmail(true)
        //       setEmailMessage('Please enter a valid email')
        //}
        console.log(err.code)
    } finally {
        setLoading(false)
    }
  }

    const onSend = async (uid) => {
    try {
      await setDoc(doc(database, 'users', uid), newUser);
    } catch (error) {
      console.log('Error saving user data', error)
    }
  }

  if (loading) {
    return (
      <Loader height={850}/>
    );
  }
  return (
    <View style={styles.first_container}>
      <View style={styles.second_container}>
        <Text style={styles.title}>Welcome to FlightApp</Text>
        <Text style={styles.subtitle}>To create an account please complete all fields</Text>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.inputs_container}>
            <CustomInput
              value={newUser.name}
              onChangeText={(val) => setNewUser({ ...newUser, name: val })}
              placeholder="Name"
              isFocused={isFocusedName}
              onFocus={() => setIsFocusedName(true)}
              onBlur={() => setIsFocusedName(false)}
            />
            <CustomInput
              value={newUser.lastname}
              onChangeText={(val) => setNewUser({ ...newUser, lastname: val })}
              placeholder="Lastname"
              isFocused={isFocusedLastName}
              onFocus={() => setIsFocusedLastName(true)}
              onBlur={() => setIsFocusedLastName(false)}
            />
            <CustomInput
              value={newUser.email}
              onChangeText={(val) => setNewUser({ ...newUser, email: val })}
              placeholder="Email"
              isFocused={isFocusedEmail}
              onFocus={() => setIsFocusedEmail(true)}
              onBlur={() => setIsFocusedEmail(false)}
              keyboardType="email-address"
              autoCapitalize="none"
              showError={validEmail}
              errorMessage={emailMessage}
            />
            <CustomInput
              value={newUser.password}
              onChangeText={(val) => setNewUser({ ...newUser, password: val })}
              placeholder="Password"
              isFocused={isFocusedPass}
              onFocus={() => setIsFocusedPass(true)}
              onBlur={() => setIsFocusedPass(false)}
              secureTextEntry={passwordVisible}
              autoCapitalize="none"
              maxLength={30}
              isPassword={true}
              onIconPress={() => setPasswordVisible(!passwordVisible)}
              icon={passwordVisible ? "eye-off" : "eye"}
              showError={validPassword}
              errorMessage="Password must contain at least 6 characters"
            />
            <CustomInput
              value={rePassword}
              onChangeText={setRePassword}
              placeholder="Confirm your password"
              isFocused={isFocusedRePass}
              onFocus={() => setIsFocusedRePass(true)}
              onBlur={() => setIsFocusedRePass(false)}
              secureTextEntry={rePasswordVisible}
              autoCapitalize="none"
              maxLength={30}
              isPassword={true}
              onIconPress={() => setRePasswordVisible(!rePasswordVisible)}
              icon={rePasswordVisible ? "eye-off" : "eye"}
              showError={validRePassword}
              errorMessage="Passwords do not match"
            />
            {validEntries ? <Text style={styles.errorEntriesTxt}>Please enter all fields</Text> : <Text style={styles.error_text}/>}
          </View>
          <ButtonNext title={'Create Account'} onPress={handleValidation} isActive={true}/>
          <Button title={'Cancel'} onPress={() => navigation.goBack()} />
        </ScrollView>
      </View>  
    </View>
  )
}

export default CreateAccount

const styles = StyleSheet.create({
  first_container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  second_container: {
    flex:1,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#48345c',
    marginTop: 8,
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#444444',
    marginHorizontal: 9,
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1, 
  },
  inputs_container: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 20,
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
  errorEntriesTxt: {
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 10,
    color: '#CD3939',
    marginTop: 8,
  },
});
