var socket = require('socket.io-client')('http://localhost:8080'),
    Q = require('q');

var UserService = {

  loadUser: function() {
    var defer = Q.defer();

    socket.on('user-loaded', function(user) {
      defer.resolve(user);
    });

    socket.emit('load-user');

    return defer.promise;
  }, 

  incrementTweetCount: function(username) {
    var defer = Q.defer();

    socket.on('tweetcount-incremented', function(user) {
      defer.resolve(user);
    });

    socket.emit('increment-tweetcount', username);

    return defer.promise;
  }   
};

module.exports = UserService;