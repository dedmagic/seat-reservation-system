const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const answer = {
    value: 42,
    description: 'main answer'
  };
  res.json(answer);
})

app.listen(4400, () => {
  console.info('Server started');
})
