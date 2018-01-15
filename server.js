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