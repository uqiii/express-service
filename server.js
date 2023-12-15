const express = require('express');
require('dotenv').config();

const connectDb = require('./config/dbConnection');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const port = process.env.PORT || 3000;

connectDb();
const app = express();

app.use(express.json());
routes.forEach((route) => app.use(route));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
