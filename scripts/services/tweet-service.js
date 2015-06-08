var socket = require('socket.io-client')('http://localhost:8080'),
    Q = require('q');

var TweetService = {

  addTweet: function(tweet) {
    var defer = Q.defer();

    socket.on('tweet-added', function(tweet) {
      defer.resolve(tweet);
    });

    socket.emit('add-tweet', tweet);

    return defer.promise;
  },
 

  loadTweets: function(tweets) {
    var defer = Q.defer();

    socket.on('tweets-loaded', function(tweets) {

      defer.resolve(tweets);
    });

    socket.emit('load-tweets');

    return defer.promise;
  }

};

module.exports = TweetService;