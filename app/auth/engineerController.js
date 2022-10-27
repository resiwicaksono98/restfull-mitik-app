const bcrypt = require('bcrypt')
const { Engineer } = require('../../models')

const registerEngineer = async (req, res, next) => {
	try {
		let payload = req.body
		// Hash password
		const hashPassword = payload.password && payload.password !== '' ? bcrypt.hashSync(payload.password, 10) : '';
		payload = { ...payload, password: hashPassword }
		const register = await Engineer.create(payload)
		return res.status(200).json({ data: register, message: 'Create Engineer Successfully' })
	} catch (error) {
		next(error)
	}
}

const loginEngineer = async (req, res, next) => {
	try {
		let engineer = await Engineer.findOne({ where: { email: req.body.email } })
		if (!engineer) return res.status(404).json({ message: 'Email not registered' })
		bcrypt.compare(req.body.password, engineer.password, function (err, result) {
			if (err) { throw (err) }
			if (!result) return res.status(400).json({ message: 'Wrong Password' })
			req.session.engineerId = engineer.id
			const { name, email, phone_number } = engineer
			res.status(200).json({ message: 'Success Login', data: { name, email, phone_number } })
		})
	} catch (error) {
		next(error)
	}
}

const engineerLogin = async (req, res) => {
	if (!req.session.engineerId) {
		return res.status(401).json({ message: 'Please Login Your Account' })
	}
	// Find User
	const engineer = await Engineer.findOne({
		attributes: ['name', 'email', 'phone_number'],
		where: {
			id: req.session.engineerId
		}
	});
	if (!engineer) return res.status(404).json({ message: "User Not Found" })
	res.status(200).json(engineer)
}

module.exports = { loginEngineer, engineerLogin, registerEngineer }