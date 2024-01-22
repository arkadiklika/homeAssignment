const validateEnvVariables = (variables) => {
  const missingVariables = variables.filter(
    (variable) => !process.env[variable]
  );

  if (missingVariables.length > 0) {
    console.error(
      `Error: The following environment variables are missing: ${missingVariables.join(
        ", "
      )}`
    );
    process.exit(1); // Exit the application if required environment variables are missing
  }
};

module.exports = {
  validateEnvVariables,
};
