var React = require('react');

var ProfileBox = React.createClass({  
  
getDefaultProps: function() {
    return {
      user: {}
    }
  },

  render: function() {
   
    return (
      <div id="profile-box">
      	<div id="avatar">
          <img src={this.props.user.avatarpath}/>
        </div>
        <div id="user-info">
          <div>{this.props.user.name}</div>        
          <div>{this.props.user.username}</div>
          <div>Tweet count:{this.props.user.tweetcount}</div>
        </div>
      </div>
    )
  },  
});

module.exports = ProfileBox