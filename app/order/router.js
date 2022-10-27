const express = require('express')
const { verifyUser } = require('../../middleware/auth')
const { createOrder, getMyOrder, getOneOrder } = require('./controller')

const router = express.Router()

router.post('/orders', verifyUser, createOrder)
router.get('/orders', verifyUser, getMyOrder)
router.get('/orders/:id', verifyUser, getOneOrder)


module.exports = router