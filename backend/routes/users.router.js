const express = require("express");
const boom = require("@hapi/boom");
const router = express.Router();
const checkAuth = require("../middlware/auth");
const UserService = require("../services/user.service");
const validatorHandler = require("../middlware/validator.handler");
const { createUserSchema } = require("../schemas/user.schemas");

const service = new UserService();

router.get("/", checkAuth, async (req, res, next) => {
  try {
    const users = await service.findAll();
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);

      if (!newUser) {
        res.status(409).json(boom.conflict("User already exists"));
      } else {
        delete newUser.password;
        res.status(201).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
