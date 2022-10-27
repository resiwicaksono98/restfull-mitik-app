const express = require('express')
const { verifyAdmin } = require('../../../middleware/auth')
const { createWorkOrder, getAllWorkOrder, getWorkOrderById, updateWorkOrder, destroyWorkOrder } = require('./controller')
const router = express.Router()

router.post('/admin/work_orders/:id', verifyAdmin, createWorkOrder)
router.get('/admin/work_orders', verifyAdmin, getAllWorkOrder)
router.get('/admin/work_orders/:id', verifyAdmin, getWorkOrderById)
router.put('/admin/work_orders/:id', verifyAdmin, updateWorkOrder)
router.delete('/admin/work_orders/:id', verifyAdmin, destroyWorkOrder)

module.exports = router