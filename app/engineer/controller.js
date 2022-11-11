const { Engineer } = require("../../models");

const getAllEngineer = async (req, res, next) => {
  try {
    const engineer = await Engineer.findAll({});
    res.status(200).json({ message: "Get All Engineer", data: engineer });
  } catch (error) {
    next(error);
  }
};

const deleteEngineer = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Engineer.destroy({ where: { id } });
    return res.status(200).json({ message: "Delete Successfull" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllEngineer, deleteEngineer };
