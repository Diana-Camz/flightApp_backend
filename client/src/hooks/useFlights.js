import { useState, useEffect } from 'react';
import { getFlights } from '../api/api';

export const useFlights = (user_id) => {
    const [flights, setFlights] = useState([])
    const [loading, setLoading] = useState(true)

    const getFlightsData = async () => {
        setLoading(true)
        try {
            const data = await getFlights(user_id);
            setFlights(data)
        } catch (error) {
            console.log('Error fetching flights data', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFlightsData()
    }, [user_id])
    return {flights, loading, setLoading, getFlightsData}
}