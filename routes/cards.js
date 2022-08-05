const router = require('express').Router();
const {
  getAllCards, createCard, deleteCard, likeCard, likeCardDelete,
} = require('../controllers/cards');

router.get('/cards', getAllCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', likeCardDelete);

module.exports = router;
