const express = require('express');

const bookingService = require("./services/bookings");

const app = express();
const PORT = 4400;

app.use(express.json());

app.get("/", (req, res) => {
  const answer = {
    value: 42,
    description: "main answer",
  };
  res.json(answer);
});

app.get("/api/bookings", (req, res) => {
  const bookings = bookingService.getAll();
  res.json(bookings);
});

app.post("/api/bookings/reserve", (req, res) => {
  console.debug(req.body);
  const result = bookingService.reserveBackend(req.body);
  res.json(result);
});

app.listen(PORT, () => {
  console.info("Server started");
});
