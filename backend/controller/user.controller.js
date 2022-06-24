require("dotenv").config();
const { Client } = require("pg");
const connectionString = process.env.CONNECTIONSTRING;

const getUsers = () => {
  const connectionData = {
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
  };

  const client = new Client(connectionData);
  const query = 'SELECT * FROM "user"';
  return new Promise((resolve) => {
    client
      .connect()
      .then(() => client.query(query))
      .then((result) => resolve(result.rows))
      .catch((e) => console.error(e))
      .finally(() => client.end());
  });
};

const getUserByEmail = (email) => {
  const connectionData = {
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
  };

  const client = new Client(connectionData);
  const query = 'SELECT * FROM "user" WHERE email= $1';
  const values = [email];
  return new Promise((resolve) => {
    client
      .connect()
      .then(() => client.query(query, values))
      .then((result) => resolve(result.rows))
      .finally(() => client.end());
  });
};

const createtUser = (user) => {
  const connectionData = {
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
  };

  const { name, email, password } = user;
  const query =
    'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3)RETURNING *';
  const values = [name, email, password];

  const client = new Client(connectionData);

  return new Promise((resolve) => {
    client
      .connect()
      .then(() => client.query(query, values))
      .then((result) => resolve(result.rows))
      .catch((err) => {
        client.end();
      })
      .finally(() => client.end());
  });
};

const updateToken = (user) => {
  const connectionData = {
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
  };

  const query = 'UPDATE "user" SET token = $2 WHERE id= $1 RETURNING *';

  const { id, token } = user;
  const values = [id, token];

  const client = new Client(connectionData);

  return new Promise((resolve) => {
    client
      .connect()
      .then(() => client.query(query, values))
      .then((result) => resolve(result.rows))
      .catch((err) => {
        client.end();
      })
      .finally(() => client.end());
  });
};
module.exports = { getUsers, createtUser, updateToken, getUserByEmail };
