var models = require('../models/index');
var app = require('../app');
var db = require('../db/index.js');
var express = require('express');
var queryString = require('query-string');
var express = require('express');
// this talks to our server
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 100000000000 // Seconds.
};
var headers = defaultCorsHeaders;
// var container = {
//   results: []
// };
var checkExistence = function (param, callback){
   db.connection.query(param, (err, result) => {
    if (err) throw err;
    callback()
  });
};

module.exports = {
  //

  messages: {
    get: function (req, res) {
      // select messages.message from messages;
      // select * from messages inner join user inner join room_names where user.id = messages.userID AND room_names.id = messages.roomID;

      var dbquery = "select * from messages inner join user inner join room_names where user.id = messages.userID AND room_names.id = messages.roomID";

      db.connection.query(dbquery, (err, arrResult) => {
        //result is string from database
        if (err) throw err;
        res.writeHead(200, headers);
        //console.log('result:',arrResult);

        res.end(JSON.stringify({results: arrResult}));
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // a function which handles posting a message to the database
      //var userQ = `select exists(select user.id from user where user.username=${userName})`;


      var obj = req.body;
      var username = obj.username;
      var message = obj.text;
      var roomname = obj.roomname;

      module.exports.users.getUserID(username, (err, userResult) => {
        if (userResult.length === 0){
          console.log('i dont exist');
          // call post
          module.exports.users.getRoomID(roomname, (err, roomResult) => {
            // check room id
            if (roomResult.length === 0){
              // 
            } else {

            }
          });
        } else {
          module.exports.users.getRoomID(roomname, (err, roomResult) => {
            // check room id
          });
        }


      });


      headers['Content-Type'] = 'application/json';
      res.writeHead(201, headers);
      res.end(JSON.stringify(obj));
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {


    },
    getUserID: function(param, callback) {
      console.log('param', param);
      // var userQ = 'select exists(select user.id from user where user.username="'+param+'";';
      var userQ = 'select user.id from user where user.username="'+param+'"';
      db.connection.query(userQ, (err, result) => {
       if (err) throw err;
       callback(err, result);
      });
    },
    getRoomID: function(param, callback) {
      console.log('param', param);
      // var userQ = 'select exists(select user.id from user where user.username="'+param+'";';
      var userQ = 'select room.id from room_names where room_names.roomname="'+param+'"';
      db.connection.query(userQ, (err, result) => {
       if (err) throw err;
       callback(err, result);
      });
    },
    post: function (req, res) {

      // insert into tablename
    },
    postRoomID: function(){

    },
    postUserID: function(){

    }
  }
};
//connection_db.query('INSERT INTO tablename SET ?', table_data , function(err, result, fields) {
//   if (err) {
//       // handle error
//     }else{
//        // Your row is inserted you can view
//       console.log(result.insertId);
//     }
// });

// insert userID into user table
  // if inserted, (inserted id is not 0), userID is userID
  // not inserted, then already in table
// insert roomID into room table
  // if inserted, (inserted id is not 0), roomID is roomID
  // not inserted, then already in table
