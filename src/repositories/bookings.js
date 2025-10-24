const { connectClient } = require("./postgresql.js");

const getAllReservations = async () => {
  const client = await connectClient();
  try {
    const result = await client.query("SELECT * FROM bookings");
    return result.rows;
  } catch (error) {
    console.error("Ошибка получения резервирований из БД");
    throw error;
  } finally {
    await client.end();
  }
};

const getReservationByEventAndUser = async (userId, eventId) => {
  const client = await connectClient();
  try {
    const query = `
      SELECT *
        FROM bookings
        WHERE user_id = $1
        AND event_id = $2`;
    const result = await client.query(query, [userId, eventId]);
    return result.rows?.[0];
  } catch (error) {
    console.error("Ошибка получения резервирования из БД");
    throw error;
  } finally {
    await client.end();
  }
};

const getReservationCountByEvent = async (eventId) => {
  const client = await connectClient();
  try {
    const query = `
      SELECT COUNT(*)
        FROM bookings
        WHERE event_id = $1`;
    const result = await client.query(query, [eventId]);
    return Number(result.rows?.[0].count);
  } catch (error) {
    console.error("Ошибка получения резервирования из БД");
    throw error;
  } finally {
    await client.end();
  }
};

const saveReservation = async (newReservation) => {
  const client = await connectClient();
  try {
    const query = `
      INSERT INTO bookings (user_id, event_id)
      VALUES ($1, $2) 
      RETURNING *`;
    const values = [newReservation.user_id, newReservation.event_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Ошибка создания резервирования");
    throw error;
  } finally {
    await client.end();
  }
};

module.exports = {
  getAllReservations,
  getReservationByEventAndUser,
  getReservationCountByEvent,
  saveReservation,
};
