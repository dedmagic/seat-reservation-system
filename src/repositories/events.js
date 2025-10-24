const { connectClient } = require("./postgresql.js");

const getEvent = async (eventId) => {
  const client = await connectClient();
  try {
    const query = `
      SELECT *
        FROM events
        WHERE id = $1`;
    const result = await client.query(query, [eventId]);
    return result.rows?.[0];
  } catch (error) {
    console.error("Ошибка получения события из БД");
    throw error;
  } finally {
    await client.end();
  }
};

module.exports = { getEvent };
