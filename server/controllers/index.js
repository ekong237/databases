var models = require('../models/index');
var mysql = require('mysql');
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

      module.exports.users.postUserID(username, (err, userResult) => {

        var userID = userResult;
        module.exports.users.postRoomID(roomname, (err, roomResult) => {
          // check room id
          var roomID = roomResult;
            // call post to add messages, with message, userResult, roomResult
            var messageQ = `insert into messages (text, userID, roomID) values (${mysql.escape(message)}, ${mysql.escape(userID)}, ${mysql.escape(roomID)})`;
            db.connection.query(messageQ, (err, result) => {
              console.log('err>>>>>>>>>>>>>>>>>>>>', err);
            });

          });
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
    getUserID: function(username, callback) {
      console.log('username', username);
      // var userQ = 'select exists(select user.id from user where user.username="'+param+'";';
      var userQ = `select user.id from user where user.username=${mysql.escape(username)}`;
      db.connection.query(userQ, (err, userID) => {
       if (err) throw err;

       callback(err, userID);
      });
    },
    getRoomID: function(roomname, callback) {
      // console.log('roomID', roomID);
      // var userQ = 'select exists(select user.id from user where user.username="'+param+'";';
      var userQ = `select room.id from room_names where room_names.roomname=${mysql.escape(roomname)}`;
      db.connection.query(userQ, (err, roomID) => {
       if (err) throw err;
       callback(err, roomID);
      });
    },
    post: function (req, res) {

    },
    postRoomID: function(roomname, callback){
      var roomQ = `insert into room_names (roomname) values (${mysql.escape(roomname)})`;
      db.connection.query(roomQ, (err, result) => {
        if (result.insertId === 0){ // doesnt exists
          getRoomID(roomname, (err, result) => {
            callback(err, result);
          });
        } else {
          callback(err, result.insertId);
        }

      });
    },
    postUserID: function(username, callback){
      var userQ = `insert into user (username) values (${mysql.escape(username)})`;
      db.connection.query(userQ, (err, result) => {
        if (result.insertId === 0){ // doesnt exists
          getRoomID(username, (err, result) => {
            callback(err, result);
          });
        } else {
          callback(err, result.insertId);
        }
      });
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
