import { useState, useEffect } from 'react';
import { getUserById } from '../api/api';

export const useUser = (user_id) => {
    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const [data] = await getUserById(user_id);
                setUser(data)
            } catch (error) {
                console.log('Error fetching user data', error)
            } finally {
                setLoadingUser(false)
            }
        };
        fetchUser()
    }, [])
    return {user, loadingUser}
}