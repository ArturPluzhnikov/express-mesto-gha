const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62ec35ae7f15bbd973adaeea',
  };

  next();
});

const logger = (req, res, next) => {
  console.log('Запрос логирован.');
  next();
};

app.use(logger);
app.use('/', routerUsers);
app.use('/', routerCards);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
