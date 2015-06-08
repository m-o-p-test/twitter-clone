var express = require('express'),
  http = require('http'),
  mongoose = require('mongoose'),
  socketio = require('socket.io'),
  Q = require('q'),
  app = express(),
  port = 8080,
  uriString = 'mongodb://localhost/twitter-clone',
  Tweet = require('./scripts/models/Tweet'),
  User = require('./scripts/models/User');

mongoose.connect(uriString, function(err, res) {
  if(err) {
    console.log('error connecting to ' + uriString + '. ' + err);
  } else {
    console.log('success connecting to ' + uriString + '.');
  }
});

app.use("/", express.static(__dirname + "/public/"));

var server = http.createServer(app).listen(port, function() {
  console.log('express server listening on port ' + port);
});

var io = socketio.listen(server);

io.on('connection', function(socket) {
  socket.on('load-tweets', function() {

    Tweet.find({}).sort([['datecreated', 'descending']]).exec(function(err, result) {
      if (!err) {
        socket.emit('tweets-loaded', result);
      } else {
        console.log('load-tweets failed ' + err);
      };
    });

  });

  socket.on('add-tweet', function(tweet) {
    var t = new Tweet(tweet);
    t.save(function(err, result) {      
      if (!err) {
        socket.emit('tweet-added', result);
      } else {
        console.log('add-tweet failed ' + err);
      }
    });
  }); 

  socket.on('load-user', function() {

    User.findOne({}).exec(function(err, user) {
      if (!err) {
         if (!user) {
            var u = new User();
             u.username = '@johnwayne';
             u.name = 'John Wayne';
             u.avatarpath = 'dist/images/avatar.jpg';
             u.tweetcount = 0;

             u.save(function(err, newuser) { 
              socket.emit('user-loaded', newuser);
             });          
          } else {
            socket.emit('user-loaded', user);      
          }          
      } else {
        console.log('load-user failed ' + err)
      };
    });
  }); 

  socket.on('increment-tweetcount', function(username) {    

    User.findOneAndUpdate({username: username}, {$inc: {tweetcount: 1}}).
    exec(function(err, result) {
      if (!err) {
        socket.emit('tweetcount-incremented', result);
      } else {
        console.log('increment-tweetcount faied ' + err);
      }
    });
  });    
})