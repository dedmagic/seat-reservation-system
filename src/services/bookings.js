const bookingRepository = require("../repositories/bookings");

const bookings = [
  {
    event_id: 1,
    user_id: "user1",
  },
  {
    event_id: 1,
    user_id: "user2",
  },
  {
    event_id: 2,
    user_id: "user3",
  },
];

const getAll = async () => {
  return await bookingRepository.getAllReservations();
};

const getReservationByEventAndUser = async (userId, eventId) => {
  const reservation = await bookingRepository.getReservationByEventAndUser(
    userId,
    eventId
  );
};

const reserve = async (newReservation) => {
  const { user_id: userId, event_id: eventId } = newReservation;
  const existsReservation = await getReservationByEventAndUser(userId, eventId);
  console.debug({ existsReservation });

  if (existsReservation) {
    return {
      error: "Повторное резервирование невозможно",
    };
  }
  const res = await bookingRepository.saveReservation(newReservation);
  console.debug("service: ", res);
  return {};

  const existsReservation1 = bookings.find(
    (book) =>
      book.event_id === newReservation.event_id &&
      book.user_id === newReservation.user_id
  );
  console.debug(existsReservation1);
  if (existsReservation1) {
    return {
      error: "Повторное резервирование невозможно",
    };
  }
  bookings.push(newReservation);
  return bookings;
};

module.exports = {
  getAll,
  reserve,
};
