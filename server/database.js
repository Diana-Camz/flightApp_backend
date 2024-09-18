import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config();


const pool = 
mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        //port: process.env.MYSQL_PORT
    })
    .promise();


//CREATE
export async function createFlight(origin, destiny, date, passengers, user_id) {
    const [result] = await pool.query(
        `INSERT INTO flights (origin, destiny, date, passengers, user_id)
         VALUES (?, ?, ?, ?, ?)`, [origin, destiny, date, passengers, user_id]);
         const flightId = result.insertId;
         return getFlightById(flightId);
         //console.log(getFlightById(flightId))
}

export async function createUser(name, lastname, email, password) {
    const [result] = await pool.query(
        `INSERT INTO users (name, lastname, email, password)
         VALUES (?, ?, ?, ?)`, [name, lastname, email, password])
         const userId = result.insertId;
         return getUserById(userId);
}

//READ
export async function getFlightById(id) {
    const [result] = await pool.query(`SELECT * FROM flights WHERE id = ?`, [id])
    return result[0];
    //console.log(result[0]);
}

export async function getFlightByUserId(id) {
    const [result] = await pool.query(`SELECT * FROM flights WHERE user_id = ?`, [id])
    return result;
    //console.log(row[0]);
}

export async function getUserById(id) {
    const [result] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id])
    return result;
    //console.log(row[0]);
}

//UPDATE
export async function updateFlight(id, value) {
     const field = Object.keys(value)[0];
     const updateValue = Object.values(value)[0];
     const [result] = await pool.query(`UPDATE flights SET ${field} = ? WHERE id = ?;`, [updateValue, id])
     return result;
}

//DELETE
export async function deleteFlight(id) {
    const [result] = await pool.query(`DELETE FROM flights WHERE id = ?;`, [id])
    return result;
}
