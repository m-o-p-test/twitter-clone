var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var TweetInput = React.createClass({
    
  mixins: [FluxMixin],

  getInitialState: function() {
      return { newTweetText: "" };
  },

  render: function() {
   
    return (
     <form id="tweet-input" onSubmit={this.onSubmitForm}>
          <div>
            <div>
              <div>
                <input type="text" placeholder="Please enter your tweet and press enter"
                       value={this.state.newTweetText}
                       onChange={this.handleTweetTextChange}/>
              </div>
            </div>
          </div>
      </form>
    )
  },

  handleTweetTextChange: function(e) {
    this.setState({newTweetText: e.target.value});

    if (e.keyCode == 13) {
      onSubmitForm(e);
    }

  }, 

  onSubmitForm: function(e) {
    e.preventDefault();
    if (this.state.newTweetText.trim()) {
      var tweet = {};
      tweet.datecreated = Date.now();
      tweet.text = this.state.newTweetText;
      tweet.username = this.props.user.username;

      this.getFlux().actions.addTweet(tweet);
      this.setState({newTweetText: ""});
    }
  } 
});

module.exports = TweetInput