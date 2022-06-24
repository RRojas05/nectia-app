const express = require('express');
const boom = require('@hapi/boom');
const router = express.Router();
const GameService = require('../services/games.services');
const validatorHandler = require('../middlware/validator.handler');
const checkAuth = require('../middlware/auth');

const {
  createGameSchema,
  updateGameSchema,
  getGameSchema,
} = require('../schemas/games.schemas');
const service = new GameService();

router.get('/', checkAuth, async (req, res, next) => {
  try {
    const games = await service.findAllGames();
    res.json(games);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:code',
  checkAuth,
  validatorHandler(getGameSchema, 'params'),
  async (req, res, next) => {
    try {
      const { code } = req.params;
      const game = await service.findbyCode(code);

      if (!game) {
        res.status(404).json(boom.notFound('Game not found').output);
      } else {
        res.status(200).json(game);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  checkAuth,
  validatorHandler(createGameSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newGame = await service.create(body);

      if (newGame != false && newGame.length > 0) {
        const data = newGame[0];
        
        res.status(201).json(data);
        
      } else {
        res.status(409).json(newGame);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:code',
  checkAuth,
  validatorHandler(updateGameSchema, 'body'),
  async (req, res, next) => {
    try {
      const { code } = req.params;
      const body = req.body;
      const game = await service.update(code, body);

      let data;
      if (game != false && game.length > 0) {
        data = game[0];
      }
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:code',
  checkAuth,
  validatorHandler(getGameSchema, 'params'),
  async (req, res, next) => {
    try {
      const { code } = req.params;
      const game = await service.delete(code);

      if (!game || (game == undefined) | (game.length === 0)) {
        res.status(409).json(boom.conflict('Game does not exist'));
      } else {
        res.status(201).json(game[0]);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
