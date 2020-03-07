const express = require('express')
const route = express.Router()
const {getAllUsers} = require('./users.controller')

route.get('/',async (req,res)=>{
    try {
        const allUsers = await getAllUsers()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({error: "SYSTE MALFUNCTIONING"})
    }
})

module.exports = route;