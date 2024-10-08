import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonNext from '../../components/ButtonNext';
import UpdateItem from '../../components/updateFlight/UpdateItem'
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { deleteFlight } from '../../api/api';
import {useFlight} from '../../hooks/useFlight'

const Update = ({route, navigation}) => {
    const {id, user_id} = route.params;
    const [isActive, setIsActive] = useState(true);
    const [handleLoader, setHandleLoader] = useState(false)
    const {flight, loading} = useFlight(id)


    const confirmDelete = async () => {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this Flight?', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => handleDelete(),
          },
        ],
        {cancelable: false}
      )
    }
    const handleDelete = async () => {
      setHandleLoader(true)
      try {
        const response = await deleteFlight(id)
        if(response.status == "ok"){
          Alert.alert('Flight deleted', 'The flight has been deleted successfully.', [
            { text: 'Ok', onPress: () => navigation.navigate('Home')}
          ])
        } else {
          Alert.alert('Error', 'An error occurred while deleting the flight. Please try again', [
            { text: 'Try Again', onPress: () => navigation.navigate('Home')}
          ])
        }
      } catch (error) {
        console.error('Error deleting flight in Update.js', error)
      }
      setHandleLoader(false)
    }

    if (loading || handleLoader) {
      return (
        <Loader height={850}/>
      );
    }

  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.title}>Edit your flight or delete it</Text>
      </View>
    <View style={styles.info_container}>
      <UpdateItem title={'Origin'} itemInfo={flight.origin} onPress={() => navigation.navigate('OriginUpdate', {id: id, user_id: user_id})}/>
      <UpdateItem title={'Destiny'} itemInfo={flight.destiny} onPress={() => navigation.navigate('DestinyUpdate', {id: id, user_id: user_id})}/>
      <UpdateItem title={'Date'} itemInfo={flight.date} onPress={() => navigation.navigate('DatesUpdate', {id: id, user_id: user_id})}/>
      <UpdateItem title={'Passengers'} itemInfo={flight.passengers} onPress={() => navigation.navigate('PassengersUpdate', {id: id, user_id: user_id})}/>
    </View>
      <View style={styles.button_container}>
        <ButtonNext title={'Delete Flight'}  onPress={confirmDelete} isActive={isActive}/>
        <Button title={'Cancel'}  onPress={() => navigation.navigate('Home', {user_id: user_id})}/>
      </View>
    </View>
  )
}

export default Update

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 100,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#48345c',
    width: 300,
  },
  title_container: {
    paddingHorizontal: 20,
    marginTop: 80,
  },
  info_container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#969696',
    borderRadius: 15,
  },
  info: {
    paddingLeft: 15,
    paddingBottom: 5,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: '#969696',
  },
  info_text_container: {
    width: 230,
  },
  info_city: {
    fontSize: 17,
  },
  info_title: {
    borderTopWidth: 0.5,
    fontSize: 13,
    color: '#7d7d7d',
    borderColor: '#a3a3a3'
  },
  button_edit_container: {
    paddingTop: 3,
    paddingRight: 5,
  },
  button_text: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  button_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
})