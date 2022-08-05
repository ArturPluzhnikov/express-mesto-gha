const User = require('../models/user');
const { IternalServerError, BadRequest, NotFound } = require('../utils/errors');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.status(NotFound).send({ message: 'По данному запросу пользователи не найдены' });
        return;
      }
      res.status(200).send({ users });
    })
    .catch(() => res.status(IternalServerError).send({ message: 'Ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(NotFound).send({ message: 'По данному запросу пользователи не найдены' });
        return;
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Переданные данные некорректны' });
        return;
      }
      res.status(IternalServerError).send({ message: 'Ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Переданные данные некорректны' });
        return;
      }
      res.status(IternalServerError).send({ message: 'Ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NotFound).send({ message: 'По данному запросу пользователи не найдены' });
        return;
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Переданные данные некорректны' });
        return;
      }
      res.status(IternalServerError).send({ message: 'Ошибка' });
    });
};

module.exports.setAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NotFound).send({ message: 'По данному запросу пользователи не найдены' });
        return;
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Переданные данные некорректны' });
        return;
      }
      res.status(IternalServerError).send({ message: 'Ошибка' });
    });
};
