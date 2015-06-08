var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
	  text        : String	
	, datecreated : Date
	, username    : String	
});

module.exports = Tweet = mongoose.model('Tweet', tweetSchema);

