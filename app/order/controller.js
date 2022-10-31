const { Order, User, Sparepart, WorkOrder, Engineer, Admin, Invoice, Order_Sparepart } = require('../../models')

// Create a new order
const createOrder = async (req, res, next) => {
	try {
		let payload = req.body
		payload = { ...payload, userId: req.session.userId }
		const order = await Order.create(payload, { where: { userId: req.session.userId } })
		return res.status(200).json({ dat: order, message: 'Success Create Order' })
	} catch (error) {
		next(error)
	}
}

// get order base on user login
const getMyOrder = async (req, res, next) => {
	try {
		const order = await Order.findAll({
			where: { userId: req.session.userId },
			attributes: ['id', 'order_type', 'description', 'status'],
			// Relation include
			include: [{
				model: User,
				as: 'user',
				attributes: ['name', 'email', 'address', 'phone_number']
			}, {
				model: Sparepart,
				as: 'sparepart',
				attributes: ['name', 'price']
			}, {
				model: WorkOrder,
				as: 'workOrder',
				attributes: ['id', 'start_date', 'finished_date', 'detail', 'status'],
				// Include nested relation from work orders
				include: [{
					model: Engineer,
					as: 'engineer',
					attributes: ['id', 'name', 'email', 'phone_number']
				}]
			}
			]
		})
		return res.status(200).json({ data: order, message: 'All your order' })
	} catch (error) {
		next(error)
	}
}

// get one order
const getOneOrder = async (req, res, next) => {
	try {
		const { id } = req.params
		const order = await Order.findOne({
			where: { id, userId: req.session.userId },
			attributes: ['id', 'order_type', 'description', 'status'],
			// Relation include
			include: [{
				model: User,
				as: 'user',
				attributes: ['name', 'email', 'address', 'phone_number']
			}, {
				model: Sparepart,
				as: 'sparepart',
				attributes: ['name', 'price']
			}, {
				model: WorkOrder,
				as: 'workOrder',
				attributes: ['id', 'start_date', 'finished_date', 'detail', 'status'],
				// Include nested relation from work orders
				include: [{
					model: Engineer,
					as: 'engineer',
					attributes: ['id', 'name', 'email', 'phone_number']
				}]
			}
			]
		})
		if (!order) return res.status(404).json({ message: 'Order not found' })
		return res.status(200).json({ message: "Get Order", data: order, })
	} catch (error) {
		next(error)
	}
}

// get all order admin only
const getAllOrder = async (req, res) => {
	const order = await Order.findAll({
		attributes: ['id', 'order_type', 'description', 'status'],
		// Relation include
		include: [{
			model: User,
			as: 'user',
			attributes: ['name', 'email', 'address', 'phone_number']
		}, {
			model: Sparepart,
			as: 'sparepart',
			attributes: ['name', 'price']
		}, {
			model: WorkOrder,
			as: 'workOrder',
			attributes: ['id', 'start_date', 'finished_date', 'detail', 'status'],
			// Include nested relation from work orders
			include: [{
				model: Engineer,
				as: 'engineer',
				attributes: ['id', 'name', 'email', 'phone_number']
			}, {
				model: Admin,
				as: 'admin',
				attributes: ['id', 'name', 'email', 'phone_number']
			}
			]
		}
		]
	})
	return res.status(200).json({ message: 'All Order', data: order })
}

// update order admin only
const updateOrder = async (req, res, next) => {
	try {
		const { id } = req.params
		let payload = req.body
		await Order.update(payload, { where: { id } })
		return res.status(200).json({ message: 'Update successfull', })

	} catch (error) {
		next(error)
	}
}

// delete order user
const destroyOrderUser = async (req, res) => {
	const { id } = req.params
	let order = await Order.findOne({ where: { id } })
	if (order.status !== 'pending') return res.status(401).json({ message: 'can not delete order, pelase call admin' })
	order = await Order.destroy({ where: { id } })
	return res.status(200).json({ message: 'Delete successfull', data: order })
}

// delete order admin 
const destroyOrder = async (req, res) => {
	const { id } = req.params
	if (!id) return res.status(404).json({ message: 'Order not found' })
	const order = await Order.destroy({ where: { id } })
	return res.status(200).json({ message: 'Delete successfull', data: order })
}



module.exports = { createOrder, getMyOrder, getOneOrder, getAllOrder, updateOrder, destroyOrder ,destroyOrderUser}