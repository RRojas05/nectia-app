
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");

const {
  logsError,
  errorHandler,
  boomErrorHandler,
} = require("./middlware/error.hadler");

const app = express();
const port = process.env.PORT || 5000;
const whiteList = ['http://localhost:3000'];

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(express.json());
app.use(cors(corsOptions));

routerApi(app);

app.use(logsError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {});
