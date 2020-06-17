require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandlers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);
app.use(errorHandler);

// module.exports = app;
app.listen(port, () => {
  console.log('listening on port: ', port);
});
