const bcrypt = require("bcrypt");

const bcryptPassword = async (password) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptedPassword = await bcrypt.hash(password, salt);

  return bcryptedPassword;
};

module.exports = bcryptPassword;
