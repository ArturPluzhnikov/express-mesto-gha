const Card = require('../models/card');
const { IternalServerError, BadRequest, NotFound } = require('../utils/errors');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch(() => res.status(IternalServerError).send({ message: 'Ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  console.log(req.user._id);

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequest).send({ message: 'Переданные данные некорректны' });
        return;
      }
      res.status(IternalServerError).send({ message: 'Ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(NotFound).send({ message: 'По данному запросу данные не найдены' });
        return;
      }
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Переданные данные некорректны' });
        return;
      }
      res.status(IternalServerError).send({ message: 'Ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NotFound).send({ message: 'По данному запросу данные не найдены' });
        return;
      }
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Переданные данные некорректны' });
        return;
      }
      res.status(IternalServerError).send({ message: 'Ошибка' });
    });
};

module.exports.likeCardDelete = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NotFound).send({ message: 'По данному запросу данные не найдены' });
        return;
      }
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BadRequest).send({ message: 'Переданные данные некорректны' });
        return;
      }
      res.status(IternalServerError).send({ message: 'Ошибка' });
    });
};
