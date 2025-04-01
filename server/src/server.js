const express = require('express')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({message: "I am working"})
})

// Get /users
// Post /users
// Patch /users
// Delete /users

// Get /items
// Post /items
// Patch /items
// Delete /items

module.exports = server