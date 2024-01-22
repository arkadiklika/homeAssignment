const errorMessages = require("../utils/errorMessages");

const authenticate = (req, res, next) => {
  const allowedOriginsString = process.env.ALLOWED_ORIGINS || "";
  const allowedOrigins = allowedOriginsString.split(",");

  req.headers.origin = req.headers.origin || req.headers.host;

  // Check if the request origin is allowed
  if (allowedOrigins.includes(req.headers.origin)) {
    const apiKey = req.headers["x-api-key"];

    // Replace 'your_api_key' with the actual API key
    if (apiKey && apiKey === process.env.API_KEY) {
      next(); // Authentication successful
    } else {
      res.status(401).json({ error: errorMessages.unauthorizedInvalidApiKey });
    }
  } else {
    res.status(403).json({ error: errorMessages.forbiddenOriginNotAllowed });
  }
};

module.exports = authenticate;
