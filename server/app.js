import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {
    createFlight,
    createUser,
    getFlightById,
    getFlightByUserId,
    getUserById,
    updateFlight,
    deleteFlight
} from './database.js';

const corsOptions = {
    origin: 'http://127.0.0.1:5173',
    methods: ['POST', 'GET'],
    credentials: true,
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions))
dotenv.config();
const port = process.env.MYSQL_PORT;



// CREATE
app.post('/flights/:id', async (req, res) => {
    const {origin, destiny, date, passengers, user_id} = req.body;
    const flight = await createFlight(origin, destiny, date, passengers, user_id);
    res.status(200).send(flight);
});

app.post('/user', async (req, res) => {
    const {name, lastname, email, password} = req.body;
    const user = await createUser(name, lastname, email, password);
    res.status(200).send(user);
})

// READ
app.get('/flights/:id', async (req, res) => {
    const flights = await getFlightByUserId(req.params.id);
    res.status(201).send(flights);
});

app.get('/flight/:id', async (req, res) => {
    const flight = await getFlightById(req.params.id);
    res.status(201).send(flight);
});

app.get('/user/:id', async (req, res) => {
    const user = await getUserById(req.params.id);
    res.status(200).send(user);
});

// UPDATE
app.put('/flight/:id', async (req, res) => {
    const value = req.body;
    const flight = updateFlight(req.params.id, value);
    res.status(200).send(flight);
});

// DELETE
app.delete('/flight/:id', async (req, res) => {
    await deleteFlight(req.params.id);
    res.send({message: 'Flight deleted successfully'});
})

app.listen(port, () => {
    console.log('server running on port 8080')
});