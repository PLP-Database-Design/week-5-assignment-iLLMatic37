// import our dependancies
const express = require("express")
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')

// configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
})

// test the connection object
db.connect((err) => {
    // connection is not successful
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }

    //connection is successful
    console.log("Successfully connected to MySQL: ", db.threadId)
})


//QUESTION 1
// retrieve data from patients table
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err,data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)

        }
        // in case successful
        res.status(200).send(data)
    })
})


//QUESTION 2
//Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err,data) => {
        if(err) {
            return res.status(400).send("Failed to get providers", err)

        }
        // in case successful
        res.status(200).send(data)
    })
})


//QUESTION 3
//Filter patients by First Name
app.get('/firstname', (req, res) => {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients, (err,data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)

        }
        // in case successful
        res.status(200).send(data)
    })
})


//QUESTION 4
//Retrieve all providers by their specialty
app.get('/specialty', (req, res) => {
    const getProviders = "SELECT provider_specialty FROM providers"
    db.query(getProviders, (err,data) => {
        if(err) {
            return res.status(400).send("Failed to get providers", err)

        }
        // in case successful
        res.status(200).send(data)
    })
})



//start and listen to server
app.listen(3300, () => {
    console.log(`server is running on port 3300...`)
})