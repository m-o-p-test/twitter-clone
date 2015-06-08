var React = require('react'),
    Fluxxor = require('Fluxxor'),
    TweetStore = require('./stores/tweet-store'),
    UserStore = require('./stores/user-store'),
    actions = require('./actions/actions'),
    TweetList = require('./components/tweet-list.jsx'),
    TweetInput = require('./components/tweet-input.jsx'),
    ProfileBox = require('./components/profile-box.jsx');

var stores = {
  TweetStore: new TweetStore(),
  UserStore: new UserStore()
};

var flux = new Fluxxor.Flux(stores, actions);

window.flux = flux;


var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Application = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("UserStore", "TweetStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();

       return {
         tweets: flux.store("TweetStore").getState(),
         user: flux.store("UserStore").getState()
    };    
  },

  componentDidMount: function() {
    this.getFlux().actions.loadUser();
    this.getFlux().actions.loadTweets();
  },

  render: function() {
    return (
      <div id="application">
          <div id ="left-column">
            <ProfileBox user={this.state.user} /></div>
          <div id="right-column">
            <TweetInput user={this.state.user}/>
            <TweetList tweets={this.state.tweets} user={this.state.user}/>
          </div>              
      </div>
    );
  }
});

React.render(<Application flux={flux} />, document.getElementById("content"));