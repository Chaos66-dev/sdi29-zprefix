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

const SERVER_ERROR = {error: 'Internal Server Error'}

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
            res.status(201).json(query)
        } else {
            res.status(404).json({error: 'Invalid Username or Password'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(SERVER_ERROR)
    }
})

// Get /users
server.get('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(id) || id < 1) {
        return res.status(400).json({error: 'Please make this request with a valid user id'})
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
server.post('/users', async (req, res) => {
    const { FirstName, LastName, Username, Password } = req.body
    if (FirstName == '' ||
        LastName == '' ||
        Username == '' ||
        Password == ''
    ) {
        return res.status(400).json({error: 'Please provide values for all fields'})
    }

    try {
        const add_user = await db('users').insert({ FirstName, LastName, Username, Password }).returning('id')
        // console.log(add_user)
        if (add_user.length > 0){
            const query = await db('users').select(['id', 'FirstName', 'LastName'])
            res.status(201).json(query)
        } else {
            res.status(404).json({error: 'Error inserting user'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(SERVER_ERROR)
    }
})
// Patch /users
server.patch('/users', async (req, res) => {
    const { FirstName, LastName, Username, Password } = req.body
    const id = parseInt(req.body.UserId)
    if (isNaN(id) || id < 1) {
        return res.status(400).json({error: 'Please provide the id of the user you want to update'})
    }
    let updates = {}
    if (FirstName != '') updates.FirstName = FirstName
    if (LastName != '') updates.LastName = LastName
    if (Username != '') updates.Username = Username
    if (Password != '') updates.Password = Password

    try {
        const patch = await db('users').where('id', id).update(updates)

        if (patch > 0) {
            const query = await db('users').select(['id', 'FirstName', 'LastName'])
            res.status(201).json(query)
        } else {
            res.status(404).json({error: 'Error updating this user'})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(SERVER_ERROR)
    }

})
// Delete /users
server.delete('/users', async (req, res) => {
    const id = parseInt(req.body.UserId)
    if (isNaN(id) || id < 1) {
        res.status(400).json({error: 'Please provide the id of the user you want to delete'})
    }

    try {
        const del = await db('users').where('id', id).del()

        if (del == 1) {
            const query = await db('users').select(['id', 'FirstName', 'LastName'])
            res.status(201).json(query)
        } else {
            res.status(404).json({error: 'Error deleting this user'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(SERVER_ERROR)
    }
})

// -------------------------------------------------------------------------------------------

// Get /items
server.get('/items', async (req, res) => {
    try {
        query = await db('items').select("*")

        if (query.length > 0) {
            res.status(200).json(query)
        } else {
            res.status(404).json({error: 'No items found in the system'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(SERVER_ERROR)
    }
})

// Post /items
server.post('/items', async (req, res) => {
    const { UserId, ItemName, Description, Quantity } = req.body

    try {
        const add_item = await db('items').insert({ UserId, ItemName, Description, Quantity }).returning('id')
        if (add_item.length > 0) {
            const query = await db('items').select("*")
            res.status(201).json(query)
        } else {
            res.status(404).json({error: 'Error inserting this item'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(SERVER_ERROR)
    }
})

// Patch /items
server.patch('/items', async (req, res) => {
    const { UserId, ItemName, Description, Quantity } = req.body
    const id = parseInt(req.body.id)
    if (isNaN(id) || id < 1) {
        return res.status(400).json({error: 'Please provide the id of the item you want to update'})
    }
    let updates = {}
    if (UserId) updates.UserId = UserId
    if (ItemName != '') updates.ItemName = ItemName
    if (Description != '') updates.Description = Description
    if (Quantity) updates.Quantity = Quantity

    try {
        const patch = await db('items').where('id', id).update(updates)

        if (patch > 0) {
            const query = await db('items').select("*")
            res.status(201).json(query)
        } else {
            res.status(404).json({error: 'Error patching this element'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(SERVER_ERROR)
    }
})

// Delete /items
server.delete('/items', async (req, res) => {
    const id = parseInt(req.body.id)
    if (isNaN(id) || id < 1) {
        return res.status(400).json({error: 'Please provide the id of the item you want to delete'})
    }

    try {
        const del = await db('items').where('id', id).del()

        if (del == 1) {
            const query = await db('items').select("*")
            res.status(201).json(query)
        } else {
            res.status(404).json({error: 'Error deleting this item'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(SERVER_ERROR)
    }
})

module.exports = server