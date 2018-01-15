import { mongo } from "mongoose";

'use strict';
//the bridge for the database side
const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
//build blog post schema
const blogPostSchema = mongoose.Schema({
    //author object, then announce data type
    author: {
        firstName: String,
        lastName: String
    },
    //title, content, date created object
    title: {String, required: true},
    content: {type: String},
    created: {type:Date, default:Date.now}
    }
});
//create Mongoose virtuals for returning authors first name and last name separated by a string

blogPostSchema.virtual('authorName').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
  });
  

