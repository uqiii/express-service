const express = require('express');
require('dotenv').config();

const connectDb = require('./config/dbConnection');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const port = process.env.PORT || 3000;

const runServer = async () => {
  console.log('Connecting to database...');
  await connectDb();
  console.log('Starting service...');
  const app = express();
  app.use(express.json());
  console.log('Registering routes...');
  routes.forEach((route) => app.use(route));
  console.log('All routes has been registered');
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
    console.log('Service successfully started!');
  });
};

runServer();
