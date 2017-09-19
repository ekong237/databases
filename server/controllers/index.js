var models = require('../models/index');
var app = require('../app');
var db = require('../db/index.js');
var express = require('express');
// this talks to our server
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var headers = defaultCorsHeaders;
module.exports = {
  messages: {
    get: function (req, res) {
      // select messages.message from messages;
      var queryString = "SELECT * FROM messages";
      db.connection.query(queryString, (err, result) => {
        //result is string from database
        if (err) throw err;
        res.writeHead(200, headers);
        console.log(result);
        res.end(JSON.stringify({results: result}));
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database


  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};
