const express = require("express");

const gamesRouter = require("./games.router");
const usersRouter = require("./users.router");
const loginRouter = require("./login.router");

function routerApi(app) {
  
  const router = express.Router();
  app.use("api/v1", router);

  app.use("/games", gamesRouter);
  app.use("/users", usersRouter);
  app.use("/login", loginRouter);
}

module.exports = routerApi;
