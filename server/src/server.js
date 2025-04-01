const express = require('express')
const server = express()
const knex = require('knex')
const knexConfig = require('../knexfile.js')
require('dotenv').config()
const environment = process.env.NODE_ENV || 'development'
const db = knex(knexConfig[environment])
const cors = require('cors')

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.status(200).json({message: "I am working"})
})

// handle login get req
server.post('/login/', async (req, res) => {
    const usrnm = req.body.username
    const psswd = req.body.password

    if (typeof usrnm != 'string' ||
        typeof psswd != 'string'
    ) {
        return res.status(400).json({error: 'Please provide a username and password'})
    }

    try {
        const query = await db('users')
                                .select('id', 'Username')
                                .where('Username', usrnm)
                                .where('Password', psswd)
        console.log(query)
        if (query.length > 0) {
            res.status(200).json(query)
        } else {
            res.status(404).json({error: 'Invalid Username or Password'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// Get /users
server.get('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(id) || id < 1) {
        res.status(400).json({error: 'Please make this request with a valid user id'})
    }

    try {
        let query
        if (id == 1) {
            query = await db('users').select('id', 'FirstName', 'LastName')
        } else {
            query = await db('users').where('id', id).select('id', 'FirstName', 'LastName')
        }

        if (query.length > 0) {
            res.status(200).json(query)
        } else {
            res.status(404).json({error: 'No users found in the system'})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})
// Post /users
// Patch /users
// Delete /users

// Get /items
server.get('/items/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(id) || id < 1) {
        res.status(400).json({error: 'Please make this request with a valid user id'})
    }

    try {
        let query
        if (id == 1) {
            query = await db('items').select("*")
        } else {
            query = await db('items').select("*").where('UserId', id)
        }

        if (query.length > 0) {
            res.status(200).json(query)
        } else {
            res.status(404).json({error: 'No items found in the system'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})
// Post /items
// Patch /items
// Delete /items

// id being the id of the user? or should it be id of the item
// Get /items/:id
// Post /items/:id
// Patch /items/:id
// Delete /items/:id

module.exports = server