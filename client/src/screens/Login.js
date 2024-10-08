import { StyleSheet, View, Text, TextInput } from 'react-native'
import React,{useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonNext from '../components/ButtonNext.js';
import Loader from '../components/Loader.js';
import CustomInput from '../components/login/CustomInput.js';
import Button from '../components/Button.js';
import { loginUser } from '../api/api.js';

const Login = ({navigation}) => {

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [validEntries, setValidEntries] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  })

  const handleLogin = () => {
      if(userData.email && userData.password){
        setValidEntries(false)
        signIn()
        }else {
          setValidEntries(true)
        }
  }

  const signIn = async () => {
   setLoading(true);
    try {
      const response = await loginUser(userData)
      if(response.status == "ok"){
        await AsyncStorage.setItem("token", response.data)
        await AsyncStorage.setItem("islogged", JSON.stringify(true))
        setUserData({email: '',password: ''})
        navigation.navigate('Home')
      }
    } catch (err) {
      // if(err.code === 'auth/invalid-credential'){
      //   setValidPassword(true)
      //   setPasswordMessage('Your email or password are incorrect')
      // }
      // if(err.code === 'auth/invalid-email'){
      //   setValidEmail(true)
      //   setEmailMessage('Please enter a valid email')
      // }
      console.error(err)
    } finally {
      setLoading(false)
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
        <Text style={styles.title}>FlightApp</Text>
        <Text style={styles.subtitle}>Please Sign in or Create an Account</Text>
        <View style={styles.inputs_container}>
          <CustomInput
            value={userData.email}
            onChangeText={(val) => setUserData({ ...userData, email: val })}
            placeholder="Email"
            isFocused={focus.email}
            onFocus={() => setFocus((prev) => ({ ...prev, email:true}))}
            onBlur={() => setFocus((prev) => ({...prev, email:false}))}
            keyboardType="email-address"
            autoCapitalize="none"
            showError={validEmail}
            errorMessage={emailMessage}
          />
          <CustomInput
            value={userData.password}
            onChangeText={(val) => setUserData({...userData, password: val})}
            placeholder="Password"
            isFocused={focus.password}
            onFocus={() => setFocus((prev) => ({ ...prev, password:true}))}
            onBlur={() => setFocus((prev) => ({ ...prev, password:false}))}
            secureTextEntry={passwordVisible}
            autoCapitalize="none"
            maxLength={30}
            isPassword={true}
            onIconPress={() => setPasswordVisible(!passwordVisible)}
            icon={passwordVisible ? "eye-off" : "eye"}
            showError={validPassword}
            errorMessage={passwordMessage}
          />
        {validEntries ? <Text style={styles.errorEntriesTxt}>Please enter your email and password</Text> : <Text style={styles.errorTxt}/>}
    </View>
        <ButtonNext title={'Sign In'} onPress={handleLogin} isActive={true}/>
        <Button title={'Create an Account'} onPress={() => navigation.navigate('CreateAccount')} isActive={true}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  first_container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 80,
  },
  second_container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#48345c',
    marginTop: 15,
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 13,
    color: '#444444',
    marginHorizontal: 10,
  },
  inputs_container: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  input_container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
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
  errorTxt: {
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
  isActiveEmail: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#444444',
    margin: 0,
  },
  isActivePassword: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#444444',
  },
  icon: {
    textAlign: 'center',
    position: 'absolute',
    paddingRight: 12,
    marginTop: 17,
}
});



export default Login