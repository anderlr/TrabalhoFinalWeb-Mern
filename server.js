const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(routes);

mongoose.Promise = Promise;
mongoose.connect(
  `mongodb+srv://anderlr:trabfinalweb2022@cluster0.sj2zlqh.mongodb.net/test`,
  { useNewUrlParser: true }
);

app.listen(PORT, function () {
  console.log(`=> API Server now listening on PORT ${PORT}!`);
});
