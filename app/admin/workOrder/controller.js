const { WorkOrder, Order, Engineer, User, Admin } = require('../../../models')

// Create Work Order
const createWorkOrder = async (req, res, next) => {
	try {
		let payload = req.body
		// Custom payload
		payload = { ...payload, adminId: req.session.adminId, orderId: req.params.id }
		const workOrder = await WorkOrder.create(payload)
		return res.status(200).json({ message: 'Create Work Order successfull', data: workOrder, })
	} catch (error) {
		next({ message: error.errors[0].message })
	}
}

// Get all work order
const getAllWorkOrder = async (req, res, next) => {
	try {
		const workOrder = await WorkOrder.findAll({
			attributes: ['start_date', 'finished_date', 'detail', 'status'],
			order: [
				['createdAt', 'DESC']
			],
			include: [{
				model: Engineer,
				as: 'engineer',
				attributes: ['name', 'email', 'phone_number']
			}, {
				model: Admin,
				as: 'admin',
				attributes: ['name', 'email', 'phone_number']
			},
			{
				model: Order,
				as: 'order',
				attributes: ['order_type', 'sparepartId', 'description', 'status'],
				// Nested include to user
				include: [
					{
						model: User,
						as: 'user',
						attributes: ['name', 'email', 'address', 'phone_number']
					}
				]
			}
			]
		})
		res.status(200).json({ data: workOrder, message: "All Work Order" })
	} catch (error) {
		next(error)
	}
}

// Get work order by id
const getWorkOrderById = async (req, res, next) => {
	try {
		const { id } = req.params
		const workOrder = await WorkOrder.findOne({
			// to be display
			attributes: ['start_date', 'finished_date', 'detail', 'status'],
			where: { id },
			// relational display
			include: [{
				model: Engineer,
				as: 'engineer',
				attributes: ['name', 'email', 'phone_number']
			}, {
				model: Admin,
				as: 'admin',
				attributes: ['name', 'email', 'phone_number']
			},
			{
				model: Order,
				as: 'order',
				attributes: ['order_type', 'sparepartId', 'description', 'status'],
				// Nested include to user
				include: [
					{
						model: User,
						as: 'user',
						attributes: ['name', 'email', 'address', 'phone_number']
					}
				]
			}
			]
		})
		return res.status(200).json({ message: `Work Order `, data: workOrder })
	} catch (error) {
		next(error)
	}
}

// update work order
const updateWorkOrder = async (req, res, next) => {
	try {
		const { id } = req.params
		let payload = req.body
		const workOrder = await WorkOrder.update(payload, { where: { id } })
		return res.status(200).json({ message: 'Update Successfull', data: workOrder })
	} catch (error) {
		next(error)
	}
}

// delete work order
const destroyWorkOrder = async (req, res, next) => {
	const { id } = req.params
	const workOrder = await WorkOrder.destroy({ where: { id } })
	if (!workOrder) return res.status(404).json({ message: "Work Order not found" })
	return res.status(200).json({ message: 'Delete Success', data: workOrder })
}


module.exports = { createWorkOrder, getAllWorkOrder, getWorkOrderById, updateWorkOrder, destroyWorkOrder }