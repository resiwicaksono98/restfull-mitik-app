const { Invoice, Order, User, Sparepart } = require('../../models')

// Create invoice
const createInvoice = async (req, res, next) => {
	try {
		const { orderId } = req.params
		const order = await Order.findOne({ where: { id: orderId } })
		if (!order) return res.status(404).json({ message: "Order not found" })
		let payload = req.body
		payload = { ...payload, orderId: orderId }
		const invoice = await Invoice.create(payload)
		return res.status(200).json({ message: 'Create successfull', data: invoice })
	} catch (error) {
		next(error)
	}
}

// Get All invoice 
const getAllInvoice = async (req, res) => {
	const invoice = await Invoice.findAll({
		attributes: ['id', 'payment_status', 'totalPrice', 'createdAt'],
		include: [{
			model: Order,
			as: 'order',
			attributes: ['id', 'order_type', 'description', 'status', 'createdAt'],
			// Nested Include
			include: [{
				model: User,
				as: 'user',
				attributes: ['id', 'name', 'email', 'address', 'phone_number']
			}, {
				model: Sparepart,
				as: 'sparepart',
				attributes: ['id', 'name', 'price']
			}
			]
		}]
	})
	return res.status(200).json({ message: 'Get All Invoice', data: invoice })
}

// Get one invoice
const getOneInvoice = async (req, res) => {
	const { id } = req.params
	const invoice = await Invoice.findOne({
		where: { id },
		attributes: ['id', 'payment_status', 'totalPrice', 'createdAt'],
		include: [{
			model: Order,
			as: 'order',
			attributes: ['id', 'order_type', 'description', 'status', 'createdAt'],
			// Nested Include
			include: [{
				model: User,
				as: 'user',
				attributes: ['id', 'name', 'email', 'address', 'phone_number']
			}, {
				model: Sparepart,
				as: 'sparepart',
				attributes: ['id', 'name', 'price']
			}
			]
		}]
	})
	if (!invoice) return res.status(404).json({ message: 'Invoice not found' })
	return res.status(200).json({ message: "Get Invoice", data: invoice })
}

// Update invoice
const updateInvoice = async (req, res, next) => {
	try {
		const { id } = req.params
		let payload = req.body
		let invoice = await Invoice.update(payload, { where: { id } })
		invoice = await Invoice.findOne({ where: { id } })
		return res.status(200).json({ message: 'Update successfull', data: invoice })
	} catch (error) {
		next(error)
	}
}

// Delete invoice
const destroyInvoice = async (req, res) => {
	const { id } = req.params
	const invoice = await Invoice.destroy({ where: { id } })
	if (!invoice) return res.status(404).json({ message: 'Invoce not found' })
	return res.status(200).json({ message: 'Delete successfull', data: invoice })
}

module.exports = { createInvoice, getAllInvoice, getOneInvoice, updateInvoice, destroyInvoice }