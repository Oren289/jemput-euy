const jwt = require("jsonwebtoken");

const jwtGenerator = (username, role) => {
  const payload = {
    user: username,
    role: role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
};

module.exports = jwtGenerator;
