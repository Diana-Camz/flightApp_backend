import { useState, useEffect } from 'react';
import { getFlight } from '../api/api';

export const useFlight = (id) => {
    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const data = await getFlight(id)
                setFlight(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        };
        fetchFlight();
    }, [id]);
    return {flight, loading, setFlight};
  }