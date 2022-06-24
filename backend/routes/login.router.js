const express = require("express");
const router = express.Router();
const boom = require("@hapi/boom");

const { tokenSing } = require("../helpers/generateToken");
const UserService = require("../services/user.service");
const validatorHandler = require("../middlware/validator.handler");
const { getUserSchema } = require("../schemas/user.schemas");
const { compare } = require("../helpers/handleBcrypt");

const service = new UserService();

router.post("/", validatorHandler(getUserSchema, "body"), async (req, res) => {

  const { email, password } = req.body;
  const user = await service.findUserByEmail(email.toLowerCase().trim());

  if (!user && !user.email) {
    res.status(404).json(boom.notFound("User not found"));
  } else {
    const checkPassword = await compare(password, user.password);
    if (checkPassword) {
      const accessToken = await tokenSing(user);
      user.token = accessToken;
      const userToken = await service.updateToken(user);

      let data;
      if(userToken!= false && userToken.length> 0){
        data= userToken[0];
      }
      res.status(200).json({data});
    } else {
      res.status(401).json(boom.unauthorized("Usuario no autorizado").output);
    }
  }
});

module.exports = router;
