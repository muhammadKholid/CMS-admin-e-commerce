const { User } = require('../models');

const authorization = (req, res, next) => {
  User.findOne({
    where: {
      id: req.userId,
    },
  })
    .then((response) => {
      if (!response) {
        throw new Error('User not found');
      } else {
        if (response.id == req.userId) {
          next();
        } else {
          throw new Error('Access denied');
        }
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = authorization;
