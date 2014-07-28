import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showInfo: function() {
      this.growl.info('This is an info message.');
    },
    showAlert: function() {
      this.growl.alert('This is an alert.');
    },
    showAlertTwitch: function() {
      this.growl.alert('This message will twitch.<br>Displayed via: <code>this.growl.alert(\'This message will twitch.\', {twitch: true});</code>', {twitch: true});
    },
    showThreeAlerts: function() {
      for (var i=0; i < 3; i++) {
        this.growl.alert('Identical messages will not display additional growl notifications.');
      }
    },
    showError: function() {
      this.growl.error('This is the error message.<br>Displayed via: <code>this.growl.error(\'This is the error message.\');</code>');
    },
    showErrorClick: function() {
      this.growl.error('You must click to dismiss this error message.', {clickToDismiss: true});
    }
  }
});
