const bcrypt = require('bcrypt');

const checkPass = (str, hash) => {
  return bcrypt.compareSync(str, hash);
};

module.exports = checkPass;
