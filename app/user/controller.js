const { User } = require("../../models");

const getUser = async (req, res, next) => {
  try {
    const user = await User.findAll({
      attributes: ["id", "name", "email", "address", "phone_number"],
    });
    return res.status(200).json({ message: "Get All User", data: user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    return res.status(200).json({ message: "Delete Successfull" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, deleteUser };
