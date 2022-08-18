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

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '62ec35ae7f15bbd973adaeea',
//   };

//   next();
// });

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
      .regex(/^https?:\/\/[a-z\d\-._~:/?#[\]@!$&'()*+,;=]+#?&/),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
}), createUser);

const logger = (req, res, next) => {
  console.log('Запрос логирован.');
  next();
};

app.use(logger);
app.use('/', routerUsers);
app.use('/', routerCards);
app.use(auth);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
