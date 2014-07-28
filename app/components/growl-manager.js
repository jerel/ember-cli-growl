import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['growl-manager'],
  actions: {
    dismiss: function(notification) {
      this.get('notifications').removeObject(notification);
    }
  }
});
