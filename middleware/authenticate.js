var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECT;

const authenticate = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.cookies.authtoken;
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = authenticate;
