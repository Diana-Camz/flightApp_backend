import { BackHandler, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Loader from '../components/Loader'
import FlightCard from '../components/FlightCard';
import { useFlights } from '../hooks/useFlights';
import { useUser } from '../hooks/useUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


export default function Flights({navigation}) {
  const {user, loadingUser} = useUser()
  const {flights, loading} = useFlights(user.id)

  const signOut = async () => {
    await AsyncStorage.removeItem('islogged')
    await AsyncStorage.removeItem('token')
    navigation.navigate('Login')
  }

  useEffect(() => {
    const backAction = () => {
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove()
  }, [])

  if (loadingUser || loading) {
    return (
      <Loader height={850}/>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.title}>My Flights</Text>
        <View style={styles.name_container}>
          <Text style={styles.name_user}>{user.name} {user.lastname}</Text>
          <Pressable onPress={signOut}>
            <Text style={styles.logout}>Sign out</Text>
          </Pressable>
        </View>
      </View>
      {flights == 0
        ? <Text style={styles.title_empty}>You haven't booked any flights yet</Text>
        : <FlatList
        data={flights}
        keyExtractor={item => item.id}
        renderItem={({item}) => 
          <Pressable onPress={() => navigation.navigate('Update', {id: item.id, user_id: user_id})}>
            <FlightCard {... item}/>
          </Pressable>}
      /> }
      <Ionicons name={'add-circle'} size={90} style={styles.iconAdd} onPress={()=>{navigation.navigate('Origin', {user_id: user_id})}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 50,
    marginBottom: 60,
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name_container: {
    paddingRight: 5,
  },
  name_user: {
    fontSize: 17,
    color: '#725099',
    fontWeight: '500',
  },
  logout: {
    textAlign: 'center',
    paddingTop: 3,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3441bd',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#9700FF',
  },
  title_empty: {
    height: 400,
    fontSize: 30,
    fontWeight: '500',
    color: '#a18ab4',
    textAlign: 'center',
    paddingTop: 250,
  },
  iconAdd: {
    position: 'absolute',
    color: '#9700FF',
    alignSelf: 'center',
    marginTop: 670,
  }
});
