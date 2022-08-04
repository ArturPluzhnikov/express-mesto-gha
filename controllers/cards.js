const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id);
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'По данному запросу данные не найдены' });
        return;
      }
      res.status(200).send(card);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'По данному запросу данные не найдены' });
        return;
      }
      res.status(200).send(card);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.likeCardDelete = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'По данному запросу данные не найдены' });
        return;
      }
      res.status(200).send(card);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};
