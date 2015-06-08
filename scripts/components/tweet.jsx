var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var Tweet = React.createClass({  
  
  render: function() {
   
    return (
      <div id="tweet">
        <div id="tweet-avatar">
          <img src={this.props.user.avatarpath} />        
        </div>
        <div id="tweet-body">
          <span id="tweet-username">{this.props.user.username}</span>
          <span>{this.timeSince(this.props.tweet.datecreated)}</span> <br />
          <span>{this.props.tweet.text}</span> 
        </div>                
      </div>
    )
  }, 

  timeSince: function(input) {

    var date = new Date(input);

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  } 
});

module.exports = Tweet