const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.json({
      ok: true,
      data
    });
});

app.post('/', async(req, res) => {
  const { body } = req;
  const {data} = await axios.post('https://jsonplaceholder.typicode.com/users', body);
  res.json({
    ok: true,
    data
  });
});

app.put('/:id', async(req, res) => {
  const { id } = req.params;
  const { body } = req;
  await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, body);
  res.json({
    ok: true,
    id
  });
});

app.delete('/:id', async(req, res) => {
  const { id } = req.params;
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  res.json({
    ok: true,
    id
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));