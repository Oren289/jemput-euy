const jwt = require("jsonwebtoken");

const jwtGenerator = (username) => {
  const payload = {
    user: username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
};

module.exports = jwtGenerator;
