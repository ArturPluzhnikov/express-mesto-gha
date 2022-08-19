// eslint-disable-next-line no-use-before-define
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-unresolved
const { errors, celebrate, Joi } = require('celebrate');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const errorHandler = require('./errors/errorHandler');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .regex(/^https?:\/\/[a-z\d\-._~:/?#[\]@!$&'()*+,;=]+#?&?/),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
}), createUser);

app.use(auth);
app.use('/', routerUsers);
app.use('/', routerCards);

app.use(errors());
app.use(errorHandler);

app.use((req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
