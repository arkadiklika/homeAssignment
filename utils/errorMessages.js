const errorMessages = {
  internalServerError: "Internal Server Error",
  userNotFound: "User not found",
  invalidRequestBody: "Invalid request body",
  invalidRequestParameters: "Invalid request parameters",
  failedToFetchUsers: "Failed to fetch users from external API",
  failedToFetchUser: "Failed to fetch user from external API",
  failedToCreateUser: "Failed to create user",
  failedToUpdateUser: "Failed to update user",
  failedToDeleteUser: "Failed to delete user",
  unauthorizedInvalidApiKey: "Unauthorized - Invalid API Key",
  forbiddenOriginNotAllowed: "Forbidden - Origin not allowed",
};

module.exports = errorMessages;
