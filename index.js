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
    res.json(data);
});

app.post('/', async() => {
  const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
  res.send(data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));