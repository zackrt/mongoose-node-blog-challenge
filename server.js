'use strict';

const bodyParser = require('body-parser');

const express = require('express');

const morgan = require('morgan');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//pull from .js endpoints
const { DATABASE_URL, PORT } = require('./config');
const { BlogPost } = require('./models');
//set app const to express
const app = express(); 
//call morgan & bodyParser.json
app.use(morgan('common'));
app.use(bodyParser.json());


app.get('/posts', (req, res) => {
    //create BlogPost promise
    BlogPost
      .find()
      .then(posts => {
        res.json(posts.map(post => post.serialize()));
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'something went terribly wrong' });
      });
  });