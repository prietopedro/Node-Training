const express = require('express')

const router = express.Router()


//GET THEM ALL
router.get('/',(req,res)=>res.json({message:"Working"}))

// GET BY ID
router.get('/:id',(req,res)=>res.json({message:"Working"}))

// POST NEW ONE
router.post('/',(req,res)=>res.json({message:"Working"}))

// EDIT 
router.put('/:id',(req,res)=>res.json({message:"Working"}))

// DELETE
router.delete('/:id',(req,res)=>res.json({message:"Working"}))


module.exports = router;