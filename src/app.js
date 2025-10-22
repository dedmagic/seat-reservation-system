const express = require('express');

const app = express();
const PORT = 4400;

app.get("/", (req, res) => {
  const answer = {
    value: 42,
    description: "main answer",
  };
  res.json(answer);
});

app.listen(PORT, () => {
  console.info("Server started");
});
