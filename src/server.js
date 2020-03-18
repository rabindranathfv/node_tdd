const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');

const { authenticated } = require('./api/middlewares/index');
const { users, posts }  = require('./api/routes/index');  

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// controlers
const usersCtrl = users({ axios });
const postsCtrl = posts({ axios });

// users
app.get('/users', usersCtrl.get);
app.post('/users', authenticated, usersCtrl.post);
app.put('/users/:id', authenticated, usersCtrl.put);
app.delete('/users/:id', authenticated, usersCtrl.delete);

// posts
app.get('/posts', postsCtrl.get);
app.post('/posts', authenticated, postsCtrl.post);
app.put('/posts/:id', authenticated, postsCtrl.put);
app.delete('/posts/:id', authenticated, postsCtrl.delete);

module.exports = app;