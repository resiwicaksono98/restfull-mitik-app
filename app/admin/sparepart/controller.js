const { Sparepart } = require('../../../models')

// Create sparepart
const createSparepart = async (req, res, next) => {
	try {
		let payload = req.body
		const sparepart = await Sparepart.create(payload)
		return res.status(200).json({ message: 'Create sparepart successfull', data: sparepart })
	} catch (error) {
		next(error)
	}
}

// Get all sparepart
const getAllSparepart = async (req, res) => {
	const sparepart = await Sparepart.findAll()
	return res.status(200).json({ message: 'All Sparepart', data: sparepart })
}

// get one sparepart
const getOneSparepart = async (req, res) => {
	const { id } = req.params
	const sparepart = await Sparepart.findOne({ where: { id } })
	if (!sparepart) return res.status(404).json({ message: 'Data not found' })
	return res.status(200).json({ message: 'Get one sparepart', data: sparepart })
}

// update sparepart
const updateSparepart = async (req, res, next) => {
	try {
		const { id } = req.params
		if (!id) return res.status(404).json({ message: 'Data not found' })
		let payload = req.body
		const sparepart = await Sparepart.update(payload, { where: { id } })
		return res.status(200).json({ message: 'Update successfull', data: sparepart })
	} catch (error) {
		next(error)
	}
}

// delete sparepart
const destroySparepart = async (req, res) => {
	const { id } = req.params
	if (!id) return res.status(404).json({ message: 'Data not found' })
	const sparepart = await Sparepart.destroy({ where: { id } })
	return res.status(200).json({ message: 'Delete successfull', data: sparepart })
}

module.exports = { createSparepart, getAllSparepart, getOneSparepart, updateSparepart, destroySparepart }