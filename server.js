const express = require('express');
require('dotenv').config();
const routes = require('./routes');

const port = process.env.PORT || 3000;

const app = express();

routes.forEach((route) => app.use(route));

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
