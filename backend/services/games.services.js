const boom = require("@hapi/boom");
const {
  createGame,
  getGames,
  getGameByCode,
  updateGamebyCode,
  deleteGamebyCode,
} = require("../controller/games.controller");

class GameService {
  constructor() {
    this.games = [];
  }

  async create(data) {
    const game = await this.findbyCode(data.code);

    if (!game || game.length === 0) {
      const game = await createGame(data);
      return game;
    } else {
      return boom.conflict("Game already exists").output;
    }
  }

  async findbyCode(code) {
    const game = await getGameByCode(code);
    if (game.length > 0) {
      return game[0];
    } else {
      return false;
    }
  }

  async findAllGames() {
    return new Promise((resolve) => {
      const games = getGames();
      resolve(games);
    });
  }

  async update(code, changes) {
    let game = await getGameByCode(code);

    if (!game || game.length === 0) {
      throw boom.notFound("Game not found");
    } else {
      let currentGame = game[0];
      currentGame = {
        ...currentGame,
        ...changes,
      };

      const newGame = updateGamebyCode(currentGame);

      return newGame;
    }
  }

  async delete(code) {
    const deleteGame = await deleteGamebyCode(code);
    return deleteGame;
  }
}

module.exports = GameService;
