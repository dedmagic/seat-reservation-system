const { Client } = require("pg");

const clientConfig = {
  host: "localhost",
  port: 5433,
  database: "seat-reservation-system",
  user: "postgres",
  password: "5432",
};

async function connectClient() {
  const client = new Client(clientConfig);
  await client.connect();
  return client;
}

module.exports = { connectClient };
