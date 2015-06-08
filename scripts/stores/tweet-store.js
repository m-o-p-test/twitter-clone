var Fluxxor = require('fluxxor'),
    constants = require('../constants/constants'),
    Immutable = require('immutable');

var TweetStore = Fluxxor.createStore({
  initialize: function() {
    this.tweets = [];
    
    this.bindActions(
      constants.ADD_TWEET, this.onAddTweet,
      constants.LOAD_TWEETS, this.onLoadTweets
    );
  },

  onAddTweet: function(payload) {

    this.tweets.unshift(payload);

    this.emit("change");
  },
  
  onLoadTweets: function(payload) {

    this.tweets = payload;

    this.emit("change");
  },  

  getState: function() {
    return this.tweets;    
  }
});

module.exports = TweetStore;