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

const getAll = () => {
  return bookings;
};

const reserveBackend = (newReservation) => {
  const existsReservation = bookings.find(
    (book) =>
      book.event_id === newReservation.event_id &&
      book.user_id === newReservation.user_id
  );
  console.debug(existsReservation);
  if (existsReservation) {
    return {
      error: "Повторное резервирование невозможно",
    };
  }
  bookings.push(newReservation);
  return bookings;
};

module.exports = {
  getAll,
  reserveBackend,
};
