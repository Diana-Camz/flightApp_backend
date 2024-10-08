import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userData } from '../api/api';

export const useUser = () => {
    const [loadingUser, setLoadingUser] = useState(true)
    const [user, setUser] = useState({})

    const getUserData = async () => {
        const tokenItem = await AsyncStorage.getItem('token')
        try {
            if(tokenItem){
                const data = await userData({token: tokenItem});
                const user = data.user
                setUser(user)
            }else{
                console.error('token not found')
            }
        } catch (error) {
            console.error('Error fetching user data', error)
        } finally {
            setLoadingUser(false)
        }
    };

    useEffect( () => {
        getUserData()
    }, []);

    return {user, loadingUser}
}