const { verify } = require('../helpers/jwt');

const authentication = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      throw new Error('token not found');
    } else {
      const decoded = verify(token);
      req.userId = decoded.userId;
      next();
    }
  } catch {
    next(err);
  }
};

module.exports = authentication;
