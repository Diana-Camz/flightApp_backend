import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Flights from '../screens/Flights'
// import Origin from '../screens/bookingScreens/Origin'
// import Destiny from '../screens/bookingScreens/Destiny'
// import Dates from '../screens/bookingScreens/Dates'
// import Passengers from '../screens/bookingScreens/Passengers'
// import Confirm from '../screens/bookingScreens/Confirm'
import Update from '../screens/updateScreens/Update'
// import OriginUpdate from '../screens/updateScreens/OriginUpdate'
// import DestinyUpdate from '../screens/updateScreens/DestinyUpdate'
// import DatesUpdate from '../screens/updateScreens/DatesUpdate'
// import PassengersUpdate from '../screens/updateScreens/PassengersUpdate'
// import Login from '../screens/Login';
// import CreateAccount from '../screens/createAccount/CreateAccount';


const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Flights}/>

      {/* <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="CreateAccount" component={CreateAccount}/> */}

      {/* <Stack.Screen name="Origin" component={Origin}/>
      <Stack.Screen name="Destiny" component={Destiny}/>
      <Stack.Screen name="Dates" component={Dates}/>
      <Stack.Screen name="Passengers" component={Passengers}/>
      <Stack.Screen name="Confirm" component={Confirm}/> */}

      <Stack.Screen name="Update" component={Update}/>
      
      {/* <Stack.Screen name="OriginUpdate" component={OriginUpdate}/>
      <Stack.Screen name="DestinyUpdate" component={DestinyUpdate}/>
      <Stack.Screen name="DatesUpdate" component={DatesUpdate}/>
      <Stack.Screen name="PassengersUpdate" component={PassengersUpdate}/> */}
    </Stack.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({})