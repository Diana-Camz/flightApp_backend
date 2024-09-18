import {BASE_URL} from '@env';   // 'http://10.0.2.2:' default way to connect to other device

const API_FLIGHTS = `${BASE_URL}/flights`;
const API_FLIGHT = `${BASE_URL}/flight`;
const API_USER = `${BASE_URL}/user`

// GET
export const getFlights = async (user_id) => {
    const res = await fetch(`${API_FLIGHTS}/${user_id}`)
    return await res.json()
}

export const getFlight = async (id) => {
    const res = await fetch(`${API_FLIGHT}/${id}`)
    return await res.json()
}

// export const getUserById = async (user_id) => {
//     const res = await fetch(`${API_USER}/${user_id}`)
//     return await res.json()
// }

// POST - CREATE
export const saveFlight = async (newFlight) => {
    const res = await fetch(API_FLIGHTS, {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newFlight)
    });
    return await res.json()
}

export const createUser = async (newUser) => {
    try {
        const res = await fetch(API_USER, {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(newUser) 
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json()
    } catch (error) {
        console.error('Error creating user:', error);
        throw error
    }
}

// PUT - UPDATE
export const updateFlight = async (id, value) => {
    const res = await fetch(`${API_FLIGHT}/${id}`, {
        method: 'PUT',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(value)
    })
    return res.json();
}

//DELETE
export const deleteFlight = async (id) => {
    await fetch(`${API_FLIGHT}/${id}`, {
        method: 'DELETE',
    })
}