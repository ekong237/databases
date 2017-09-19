var db = require('../db/index.js');
var request = require('request');
// this talks to our database

// dbConnection.query(queryString, queryArgs, function(err) {
//   if (err) { throw err; }
//
//   // Now query the Node chat server and see if it returns
//   // the message we just inserted:



module.exports = {
  messages: {
    get: function (err, resp) {



    }, // a function which produces all the messages
    post: function () {

    }
    // a function which can be used to insert a message into the database
    // insert into messages (id, message, createdAt, userID, roomID) values (default, 'HELLOOOO', default, 1, 1);



  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
    // insert into user (id, user) values (default, 'liz');
};
