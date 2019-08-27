const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('../schema/schema');

const app = express();
const PORT = 3001;
const LOGIN = 'user_1';
const PASS = 'pass123';

mongoose.connect(
  `mongodb://${LOGIN}:${PASS}@ds213538.mlab.com:13538/graphql-pet`,
  { useNewUrlParser: true }
);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

mongoose.connection.on('error', err => console.log(`Connection error: ${err}`));
mongoose.connection.once('open', () => console.log(`Connected to DB!`));

app.listen(PORT, error => {
  error ? console.log(error) : console.log('Server started!');
});
