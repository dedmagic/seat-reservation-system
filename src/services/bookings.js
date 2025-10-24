const bookingRepository = require("../repositories/bookings");
const eventService = require("./events");

const getAll = async () => {
  return await bookingRepository.getAllReservations();
};

const getReservationByEventAndUser = async (userId, eventId) => {
  const reservation = await bookingRepository.getReservationByEventAndUser(
    userId,
    eventId
  );
  return reservation;
};

const getReservationCountByEvent = async (eventId) => {
  return await bookingRepository.getReservationCountByEvent(eventId);
};

const reserve = async (newReservation) => {
  const { user_id: userId, event_id: eventId } = newReservation;

  const event = await eventService.getEvent(eventId);
  const reservationCount = await getReservationCountByEvent(eventId);
  if (reservationCount >= event.total_seats) {
    return {
      error: "Превышено количество мест на мероприятии",
    };
  }

  // Для защиты от повторного резервирования использутся тот факт, что в БД
  // настроено ограничение уникальности для пары (event_id, user_id)
  try {
    await bookingRepository.saveReservation(newReservation);
    return {
      msg: "Место зарезервировано",
    };
  } catch (error) {
    const UNIQUE_VIOLATION = "23505";
    if (error.code === UNIQUE_VIOLATION) {
      return {
        error: "Повторное резервирование невозможно",
      };
    }
    throw error;
  }
};

const reserveBackend = async (newReservation) => {
  const { user_id: userId, event_id: eventId } = newReservation;

  const event = await eventService.getEvent(eventId);
  const reservationCount = await getReservationCountByEvent(eventId);
  if (reservationCount >= event.total_seats) {
    return {
      error: "Превышено количество мест на мероприятии",
    };
  }

  // Проверка на повторное резервирование полностью на backend, структура БД не учитывается
  const existsReservation = await getReservationByEventAndUser(userId, eventId);
  if (existsReservation) {
    return {
      error: "Повторное резервирование невозможно",
    };
  }
  await bookingRepository.saveReservation(newReservation);
  return {
    msg: "Место зарезервировано",
  };
};

module.exports = {
  getAll,
  reserve,
};
