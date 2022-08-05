const router = require('express').Router();
const {
  getAllUsers, getUser, createUser, updateUser, setAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);

router.get('/users/:id', getUser);

router.post('/users', createUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', setAvatar);

module.exports = router;
