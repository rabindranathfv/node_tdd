const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { users }  = require('./api/routes/index');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const usersCtrl = users({ axios });

app.get('/',  usersCtrl.get);

app.post('/', usersCtrl.post);

app.put('/:id', usersCtrl.put);

app.delete('/:id', usersCtrl.delete);

app.listen(port, () => console.log(`server listening on port ${port}!`));