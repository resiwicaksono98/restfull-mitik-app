const { Admin } = require('../../models')
const bcrypt = require('bcrypt')

const registerAdmin = async (req, res, next) => {
	try {
		let payload = req.body
		// Hash password
		const hashPassword = payload.password && payload.password !== '' ? bcrypt.hashSync(payload.password, 10) : '';
		payload = { ...payload, password: hashPassword }
		const register = await Admin.create(payload)
		return res.status(200).json({ data: register, message: 'Create Admin Successfully' })
	} catch (error) {
		next(error)
	}
}

const loginAdmin = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ where: { email: req.body.email } })
		if (!admin) return res.status(404).json({ message: 'Email not registered' })
		bcrypt.compare(req.body.password, admin.password, function (err, result) {
			if (err) { throw (err) }
			if (!result) return res.status(400).json({ message: 'Wrong Password' })
			req.session.adminId = admin.id
			const { name, email, phone_number } = admin
			res.status(200).json({ message: 'Success Login', data: { name, email, phone_number } })
		})
	} catch (error) {
		next(error)
	}
}

const adminLogin = async (req, res) => {
	if (!req.session.adminId) {
		return res.status(401).json({ message: 'Please Login Your Account' })
	}
	// Find User
	const admin = await Admin.findOne({
		attributes: ['name', 'email', 'role', 'phone_number'],
		where: {
			id: req.session.adminId
		}
	});
	if (!admin) return res.status(404).json({ message: "User Not Found" })
	res.status(200).json(admin)
}


module.exports = { registerAdmin, loginAdmin, adminLogin }
