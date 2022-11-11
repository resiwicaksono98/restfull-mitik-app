const { Admin } = require("../../models");

const getAllAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findAll({});
    res.status(200).json({ message: "Get All Admin", data: admin });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Admin.destroy({ where: { id } });
    return res.status(200).json({ message: "Delete Successfull" });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteAdmin, getAllAdmin };
