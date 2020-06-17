const jwt = require('jsonwebtoken');

module.exports = {
  sign(id, name, role) {
    return jwt.sign({ userId: id, name: name, role: role }, process.env.JWT_SECRET);
  },
  verify(data) {
    return jwt.verify(data, process.env.JWT_SECRET);
  },
};
