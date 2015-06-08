var Fluxxor = require('fluxxor'),
    constants = require('../constants/constants')

var UserStore = Fluxxor.createStore({
  initialize: function() {
  var user = {};
    
    this.bindActions(
      constants.LOAD_USER, this.onUserLoaded
    );
    
  },
    
  onUserLoaded: function(user) {
    this.user = user;
    this.emit("change");
  },  

  getState: function() {
    return this.user;
  }
});

module.exports = UserStore;