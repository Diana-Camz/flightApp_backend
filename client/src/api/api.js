import {BASE_URL} from '@env';   // 'http://10.0.2.2:' default way to connect to other device

const API_FLIGHTS = `${BASE_URL}/flights`;
const API_FLIGHT = `${BASE_URL}/flight`;
const API_USER = `${BASE_URL}/user`
const API_LOGIN = `${BASE_URL}/login`

// GET
export const getFlights = async (user_id) => {
    const res = await fetch(`${API_FLIGHTS}/${user_id}`)
    return await res.json()
}

export const getFlight = async (id) => {
    const res = await fetch(`${API_FLIGHT}/${id}`)
    return await res.json()
}

export const getUserById = async (user_id) => {
    const res = await fetch(`${API_USER}/${user_id}`)
    return await res.json()
}

// POST - CREATE
export const saveFlight = async (newFlight) => {
    const user_id = newFlight.user_id;
   try {
    const res = await fetch(`${API_FLIGHTS}/${user_id}`, {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newFlight)
    });
    return await res.json()
   } catch (error) {
     console.error('Error saving flight in api.js', error)
   }
}

export const createUser = async (newUser) => {
    try {
        const res = await fetch(API_USER, {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(newUser) 
        });
        return res.json()
    } catch (error) {
        console.error('Error creating user in api.js', error);
    }
}

export const loginUser = async (userData) => {
    try {
        const res = await fetch(API_LOGIN, {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(userData) 
        });
        return await res.json()
    } catch (error) {
        console.error('Error login in api.js', error)
    }
}

// PUT - UPDATE
export const updateFlight = async (id, value) => {
    try {
        const res = await fetch(`${API_FLIGHT}/${id}`, {
            method: 'PUT',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(value)
        })
        return await res.json()
    } catch (error) {
        console.error('Error updating flight in api.js', error)
    }
}

// DELETE
export const deleteFlight = async (id) => {
    const res = await fetch(`${API_FLIGHT}/${id}`, {
        method: 'DELETE',
    });
    return await res.json()
}