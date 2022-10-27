const {User, Admin} = require('../models')

const verifyUser = async (req, res, next) => {
	if (!req.session.userId) return res.status(401).json({ msg: 'Please login your account' })
	const user = await User.findOne({ where: { id: req.session.userId } })
	if (!user) return res.status(404).json({ msg: 'User not found' })
	next()
}

const verifyAdmin = async (req, res, next) => {
	if (!req.session.adminId) return res.status(401).json({ msg: 'Please login admin account' })
	const admin = await Admin.findOne({ where: { id: req.session.adminId } })
	if (!admin) return res.status(404).json({ message: "Account Not Detect, Login Again" })
	next()
}

const verifySuperAdmin = async (req, res, next) => {
	if (!req.session.adminId) return res.status(401).json({ msg: 'Please login super admin account' })
	const admin = await Admin.findOne({ where: { id: req.session.adminId } })
	if (admin.role !== 'superAdmin') return res.status(401).json({ msg: 'You are not super admin' })
	next()
}



module.exports = { verifyUser, verifyAdmin, verifySuperAdmin }

