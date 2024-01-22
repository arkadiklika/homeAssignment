const axios = require("axios");
const errorMessages = require("../utils/errorMessages");

const getUsersFromPage = async (page) => {
  try {
    const response = await axios.get(
      `${process.env.USERS_API_URL}?page=${page}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(errorMessages.failedToFetchUsers);
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${process.env.USERS_API_URL}/${id}`);
    const user = response.data.data;

    if (user) {
      return user;
    } else {
      throw new Error(errorMessages.userNotFound);
    }
  } catch (error) {
    throw new Error(errorMessages.failedToFetchUser);
  }
};

const createUser = async (newUser) => {
  try {
    if (
      newUser &&
      newUser.hasOwnProperty("name") &&
      newUser.hasOwnProperty("job")
    ) {
      const response = await axios.post(`${process.env.USERS_API_URL}`, {
        name: newUser.name,
        job: newUser.job,
      });

      const createdUser = response.data;

      return createdUser;
    } else {
      throw new Error(errorMessages.invalidRequestBody);
    }
  } catch (error) {
    throw new Error(errorMessages.failedToCreateUser);
  }
};

const updateUserById = async (userId, updatedUser) => {
  try {
    if (userId && updatedUser) {
      const response = await axios.put(
        `${process.env.USERS_API_URL}/${userId}`,
        {
          name: updatedUser.name,
          job: updatedUser.job,
        }
      );

      const updatedUserObj = response.data;

      return updatedUserObj;
    } else {
      throw new Error(errorMessages.invalidRequestParameters);
    }
  } catch (error) {
    throw new Error(errorMessages.failedToUpdateUser);
  }
};

const deleteUserById = async (userId) => {
  try {
    if (userId) {
      await axios.delete(`${process.env.USERS_API_URL}/${userId}`);
    } else {
      throw new Error(errorMessages.invalidRequestParameters);
    }
  } catch (error) {
    throw new Error(errorMessages.failedToDeleteUser);
  }
};

module.exports = {
  getUsersFromPage,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
