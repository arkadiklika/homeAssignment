const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { validateEnvVariables } = require("./utils");

const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();

// Validate environment variables
validateEnvVariables(["API_KEY", "USERS_API_URL", "ALLOWED_ORIGINS"]);

app.use(bodyParser.json());

const allowedOriginsString = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = allowedOriginsString.split(",");

app.use(
  cors({
    origin: allowedOrigins,
  })
);

// Routes
app.use("/api/users", require("./routes/usersRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
