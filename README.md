# mongoose-node-blog-challenge

Create an API for a blogging app that has four endpoints:

* GET /posts

sends back all posts in the database.
each post should be an object that looks like this:

  {
      "title": "some title",
      "content": "a bunch of amazing words",
      "author": "Sarah Clarke",
      "created": "1481322758429"
  }
* GET /posts/:id sends back a single post with :id if it exists, using the schema described above.

* POST /posts

endpoint for creating new blog posts.
expects request body to contain a JSON object like this:

  {
      "title": "some title",
      "content": "a bunch of amazing words",
      "author": {
          "firstName": "Sarah",
          "lastName": "Clarke"
      }
  }
validates that the request body includes title, content, and author, and returns a 400 status and a helpful error message if one of these is missing.
it should return the new post (using the same key/value pairs as the posts returned by GET /posts).
* PUT /posts/:id

endpoint that allows you to update the title, content, and author fields.
expects request body to contain a JSON object like this (note that this would only update the title — if you wanted to update content or author, you'd have to send those over too):

  {
      "id": "ajf9292kjf0",
      "title": "New title"
  }
the id property in the request body must be there.

if the id in the URL path (/posts/:id) and the one in the request body don't match, it should return a 400 status code with a helpful error message.
it should return the updated object, with a 200 status code.
DELETE /posts/:id

allows you to delete a post with a given id.
responds with a 204 status code, but no content.

