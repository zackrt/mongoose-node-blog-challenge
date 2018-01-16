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
        res.status(500).json({ error: 'Something went wrong' });
    });
});
//get by id using .findById
app.get('/post/:id', (req,res) => {
  BlogPost
    .findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error:'something went wrong'});
    });
}); 
//post with a For Loop of required fields, if the field is not filled out properly, return error (const message) saying which field needs to be filled out: title, content, or author
app.post('/posts', (req, res) => {
  const requiredFields = ['title',,'content','author'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
}
//setup BlogPost .create with 3 objects: title, content and author
  BlogPost
    .create({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    })
    .then(blogPost => res.status(201).json(blogPost.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong'});
    });
  });
//delete functionality
app.delete('/post/:id', (req, res => {
  BlogPost
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'Success!'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong'});
    });
});

app.put('/posts/:id', (req,res) => {
 if (!(req.params.id && req.body.id === req.body.id)) {
   res.status(400).json({
     error: 'Request path id and request body id values must match'
   });
 }

const updated = {};
//array updateableFields then use forEach
const updateableFields = ['title','content','author'];
updateableFields.forEach(field => {
 if (field in req.body) {
   updated[field] = req.body[field];
 }
}); 

BlogPost
  .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
  .then(updatedPost => res.status(204).end())
  .catch(err => res.status(500).json({ message:'something went wrong'})); 
});

app.delete('/:id', (req,res) => {
  BlogPost
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`successfully deleted blog post with id \`${req.params.ID}\``);
      res.status(204).end();
    });
});
// .use send 404 and message if server doesn't connect 
app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

