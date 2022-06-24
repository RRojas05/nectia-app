require("dotenv").config();
const { Client } = require("pg");
const connectionString = 'postgres://pjnzivnzkhafpf:d29cc735fd387f0b370448384de397a3dbe87cd03a76e87018a036f3b6951e8c@ec2-23-23-182-238.compute-1.amazonaws.com:5432/dbu49qllfacag3';

const createGame = (game) => {
  const connectionData = {
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
  };

  const client = new Client(connectionData);
  const query =
    'INSERT INTO "games" (title, price, image, code) VALUES ($1, $2, $3, $4)RETURNING *';
  const values = [game.title, game.price, game.image, game.code];

  return new Promise((resolve) => {
    client
      .connect()
      .then(() => client.query(query, values))
      .then((result) => resolve(result.rows))
      .finally(() => client.end());
  });
};

const getGames = () => {
  const connectionData = {
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
  };

  const client = new Client(connectionData);
  const query = 'SELECT * FROM "games"';

  return new Promise((resolve) => {
    client
      .connect()
      .then(() => client.query(query))
      .then((result) => resolve(result.rows))
      .finally(() => client.end());
  });
};

const getGameByCode = (code) => {
  const connectionData = {
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
  };

  const client = new Client(connectionData);
  const query = 'SELECT * FROM "games" WHERE code=$1';
  const values = [code];
  return new Promise((resolve) => {
    client
      .connect()
      .then(() => client.query(query, values))
      .then((result) => resolve(result.rows))
      .finally(() => client.end());
  });
};

const updateGamebyCode = (game) => {
  const connectionData = {
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
  };

  const client = new Client(connectionData);
  const query =
    'UPDATE "games" SET title= $2, price= $3, image=$4 WHERE code=$1 RETURNING *';
  const { code, title, price, image } = game;
  const values = [code, title, price, image];
  return new Promise((resolve) => {
    client
      .connect()
      .then(() => client.query(query, values))
      .then((result) => resolve(result.rows))
      .finally(() => client.end());
  });
};

const deleteGamebyCode = (code) => {
  const connectionData = {
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
  };

  const client = new Client(connectionData);
  const query = 'DELETE FROM "games" WHERE code=$1 RETURNING*';
  const values = [code];

  return new Promise((resolve) => {
    client
      .connect()
      .then(() => client.query(query, values))
      .then((result) => resolve(result.rows))
      .finally(() => client.end());
  });
};

module.exports = {
  createGame,
  getGames,
  getGameByCode,
  updateGamebyCode,
  deleteGamebyCode,
};
