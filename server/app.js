import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    createFlight,
    createUser,
    getFlightById,
    getFlightByUserId,
    getUserById,
    updateFlight,
    deleteFlight,
    getUserByEmail
} from './database.js';

const corsOptions = {
    origin: 'http://127.0.0.1:5173',
    methods: ['POST', 'GET'],
    credentials: true,
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
var salt = bcrypt.genSaltSync(10);
dotenv.config();
const port = process.env.PORT;
const jwt_secret = process.env.JWT_SECRET;



// CREATE
app.post('/flights/:id', async (req, res) => {
    try {
        const {origin, destiny, date, passengers, user_id} = req.body;
        const flight = await createFlight(origin, destiny, date, passengers, user_id);
        res.status(200).send({status: "ok", flight});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error in app.js' });
    }
});

app.post('/user', async (req, res) => {
    try {
        const {name, lastname, email, password} = req.body;
        var hash = bcrypt.hashSync(password, salt);
        const user = await createUser(name, lastname, email, hash);
        res.status(201).send({status: "ok", user});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const userExist = await getUserByEmail(email);
        if(userExist.length > 0){
            const correctPassword = bcrypt.compareSync(password, userExist[0].password);
            if(correctPassword){
                const token = jwt.sign({email: userExist[0].email}, jwt_secret)
                if(res.status(201)){
                    return res.send({status: 'ok', data: token, user: userExist});
                }
            } else {
                res.send('Invalid password')
            }
        } else {
            res.send('Invalid email')
        }
    } catch (error) {
        res.status(500).send('Error login in app.js')
    }
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
    res.status(200).send({status: "ok", flight});
});

// DELETE
app.delete('/flight/:id', async (req, res) => {
    await deleteFlight(req.params.id);
    res.status(200).send({status: "ok"});
})

app.listen(port || 3000, () => {
    console.log(`server running on port ${port}`)
});