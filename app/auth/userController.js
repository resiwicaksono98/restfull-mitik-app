const { User } = require('../../models')
const bcrypt = require("bcrypt")

const registerUser = async (req, res, next) => {
	try {
		let payload = req.body
		// Hash password 
		const hashPassword = payload.password && payload.password !== '' ? bcrypt.hashSync(payload.password, 10) : '';
		payload = { ...payload, password: hashPassword }
		const register = await User.create(payload)
		return res.status(200).json({ data: register, message: 'Create User Successfully' })
	} catch (error) {
		next(error)
	}
}

const loginUser = async (req, res, next) => {
	try {
		let user = await User.findOne({ where: { email: req.body.email } })
		if (!user) return res.status(404).json({ message: 'Email not registered' })
		bcrypt.compare(req.body.password, user.password, function (err, result) {
			if (err) { throw (err) }
			if (!result) return res.status(400).json({ message: 'Wrong Password' })
			req.session.userId = user.id
			const { name, address, email, phone_number } = user
			res.status(200).json({ message: 'Success Login', data: { name, address, email, phone_number } })
		})

	} catch (error) {
		next(error)
	}
}

const userLogin = async (req, res) => {
	if (!req.session.userId) {
		return res.status(401).json({ message: 'Please Login Your Account' })
	}
	// Find User
	const user = await User.findOne({
		attributes: ['name', 'email', 'address', 'phone_number'],
		where: {
			id: req.session.userId
		}
	});
	if (!user) return res.status(404).json({ message: "User Not Found" })
	res.status(200).json(user)
}

const logoutUser = async (req, res) => {
	req.session.destroy()
	res.status(200).json({ message: "You are logout" })
}


module.exports = { registerUser, loginUser, userLogin, logoutUser }