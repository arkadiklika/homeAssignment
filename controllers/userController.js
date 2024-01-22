const usersDal = require("../dals/usersDal");
const errorMessages = require("../utils/errorMessages");

const getUsers = async (req, res) => {
  try {
    const page = req.params.page;

    const usersFromExternalApi = await usersDal.getUsersFromPage(page);

    res.status(200).json(usersFromExternalApi);
  } catch (error) {
    res.status(500).json({ error: errorMessages.internalServerError });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await usersDal.getUserById(userId);

    res.status(200).json(user);
  } catch (error) {
    if (error.message === errorMessages.userNotFound) {
      res.status(404).json({ error: errorMessages.userNotFound });
    } else {
      res.status(500).json({ error: errorMessages.internalServerError });
    }
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;

    const createdUser = await usersDal.createUser(newUser);

    res.status(201).json(createdUser);
  } catch (error) {
    if (error.message === errorMessages.invalidRequestBody) {
      res.status(400).json({ error: errorMessages.invalidRequestBody });
    } else {
      res.status(500).json({ error: errorMessages.internalServerError });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;

    const updatedUserObj = await usersDal.updateUserById(userId, updatedUser);

    res.status(200).json(updatedUserObj);
  } catch (error) {
    if (error.message === errorMessages.invalidRequestParameters) {
      res.status(400).json({ error: errorMessages.invalidRequestParameters });
    } else if (error.message === errorMessages.failedToUpdateUser) {
      res.status(404).json({ error: errorMessages.userNotFound });
    } else {
      res.status(500).json({ error: errorMessages.internalServerError });
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    await usersDal.deleteUserById(userId);

    res.status(204).end();
  } catch (error) {
    if (error.message === errorMessages.invalidRequestParameters) {
      res.status(400).json({ error: errorMessages.invalidRequestParameters });
    } else if (error.message === errorMessages.failedToDeleteUser) {
      res.status(404).json({ error: errorMessages.userNotFound });
    } else {
      res.status(500).json({ error: errorMessages.internalServerError });
    }
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
