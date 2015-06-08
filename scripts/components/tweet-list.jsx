var React = require('react'),
    Tweet = require('./tweet.jsx');

var TweetList = React.createClass({  

  getDefaultProps: function() {
    return {
      tweets: []
    }
  },

  render: function() {

    _this = this;

    return (
      <div id="tweet-list">
        {this.props.tweets.map(function(tweet, i) {
          return (            
              <Tweet tweet={tweet} user={_this.props.user}/>
          );
        })}
      </div>
    )
  }

});

module.exports = TweetList;