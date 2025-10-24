const eventRepository = require("../repositories/events");

const getEvent = async (id) => {
  return await eventRepository.getEvent(id);
};

module.exports = { getEvent };
