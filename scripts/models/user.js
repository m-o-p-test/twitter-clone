var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	  username   : String
	, name       : String
	, avatarpath : String
	, tweetcount : Number
});

module.exports = User = mongoose.model('User', userSchema);
