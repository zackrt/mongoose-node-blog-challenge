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
//set methods.serialize?? as a function to return uniquely generated id, author(with virtual authorName, content, title, created,  
blogPostSchema.methods.serialize = function() {
    return {
      id: this._id,
      author: this.authorName,
      content: this.content,
      title: this.title,
      created: this.created
    };
};
//assign mongoose.model to a const BlogPost for export  
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
//export as BlogPost for otehr js files  
module.exports = {BlogPost};  

