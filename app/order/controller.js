const { Order, User } = require('../../models')

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

const getMyOrder = async (req, res, next) => {
	try {
		const order = await Order.findAll({
			where: { userId: req.session.userId },
			include: [{
				model: User,
				as: 'user',
				attributes: ['name', 'email', 'address', 'phone_number']
			}]
		})
		return res.status(200).json({ data: order, message: 'All your order' })
	} catch (error) {
		next(error)
	}
}

const getOneOrder = async (req, res, next) => {
	try {
		const { id } = req.params
		const order = await Order.findOne({ where: { id, userId: req.session.userId } })
		if (!order) return res.status(404).json({ message: 'Order not found' })
		return res.status(200).json({ data: order, message: "Get Order" })
	} catch (error) {
		next(error)
	}
}



module.exports = { createOrder, getMyOrder, getOneOrder }