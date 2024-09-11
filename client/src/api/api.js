import {BASE_URL} from '@env';   // 'http://10.0.2.2:' default way to connect to other device

const API_FLIGHTS = `${BASE_URL}/flights/2`
const API_FLIGHT = `${BASE_URL}/flight`

export const getFlights = async () => {
    const res = await fetch(API_FLIGHTS)
    return await res.json()
}

export const getFlight = async (id) => {
    const res = await fetch(`${API_FLIGHT}/${id}`)
    return await res.json()
}

export const saveFlight = async (newFlight) => {
    const res = await fetch(API_FLIGHTS, {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newFlight)
    });
    return await res.json()
}

export const deleteFlight = async (id) => {
    await fetch(`${API_FLIGHT}/${id}`, {
        method: 'DELETE',
    })
}