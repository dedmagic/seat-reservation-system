const express = require('express');

const bookingService = require("./services/bookings");

const app = express();
const PORT = 4400;

app.use(express.json());

app.get("/", (req, res) => {
  const answer = {
    value: 42,
    description: "answer to the main question",
  };
  res.json(answer);
});

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await bookingService.getAll();
    res.json(bookings);
  } catch (error) {
    res.json(error);
  }
});

app.post("/api/bookings/reserve", async (req, res) => {
  const result = await bookingService.reserve(req.body);
  res.json(result);
});

app.listen(PORT, () => {
  console.info("Server started");
});
