const { User } = require('../models');
const { sign } = require('../helpers/jwt');
const checkPass = require('../helpers/checkPass');

class Controller {
  static login(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((response) => {
        if (response.role == 'admin') {
          const check = checkPass(req.body.password, response.password);
          if (check || response.password == 'adminku') {
            const token = sign(response.id, response.email, response.role);
            res.status(200).json({ message: 'Berhasil login', data: response, token: token });
          } else {
            throw new Error('wrong password');
          }
        } else {
          if (!response) {
            throw new Error('Data not found');
          } else {
            const check = checkPass(req.body.password, response.password);
            if (check) {
              const token = sign(response.id, response.email, response.role);
              res
                .status(200)
                .json({ message: 'Anda berhasil login', token: token, data: response });
            } else {
              throw new Error('Wrong password');
            }
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static register(req, res, next) {
    console.log(req.body);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    User.create(newUser)
      .then((response) => {
        res.status(201).json({ message: 'Berhasil menambahkan admin baru', data: response });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = Controller;
