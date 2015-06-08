var constants = require('../constants/constants'),
    tweetService = require('../services/tweet-service'),
    userService = require('../services/user-service');

var actions = {
  addTweet: function(tweet) {
    var _this = this;
    tweetService.addTweet(tweet).then(function(tweet) {
    	userService.incrementTweetCount(tweet.username).then(function(user){  		
    		_this.dispatch(constants.ADD_TWEET, tweet);
    		_this.dispatch(constants.LOAD_USER, user);
    	});  
    });
  },

  loadTweets: function() {
    var _this = this;
    tweetService.loadTweets().then(function(tweets) {    	
		  _this.dispatch(constants.LOAD_TWEETS, tweets);   
    });
  },

  loadUser: function() {
  	var _this = this;
  	userService.loadUser().then(function(user){
  		_this.dispatch(constants.LOAD_USER, user);
  	});  	
  }
};

module.exports = actions;