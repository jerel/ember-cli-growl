import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['growl-instance'],
  classNameBindings: ['type'],
  type: function() {
    return this.get('notification.options.type');
  }.property(),
  click: function() {
    this.destroyAlert();
  },
  didInsertElement: function() {
    if (this.get('notification.options.fadeIn')) {
      this.$().hide().fadeIn();
    }

    if (this.get('notification.options.twitch')) {
      var el = this.$(),
          maxDegree = 1,
          negative;
      var interval = window.setInterval(function() {
        negative = negative ? '' : '-';
        el.css('transform', 'rotate(' + negative + maxDegree + 'deg)');
      }, 75);
      Ember.run.later(function() {
        el.css('transform', 'rotate(0deg)');
        window.clearInterval(interval);
      }, 400);
    }

    // unless a click-to-dismiss is required we auto close
    if ( ! this.get('notification.options.clickToDismiss')) {
      Ember.run.later(this, this.destroyAlert, this.get('notification.options.closeIn'));
    }
  },
  destroyAlert: function() {
    var self = this;
    if (this.$()) {
      this.$().fadeOut(Ember.run(this, function() {
        // send the action on up so the manager can remove this item from array
        self.sendAction('action', self.get('notification'));
      }));
    } else {
      self.sendAction('action', self.get('notification'));
    }
  },
  actions: {
    dismiss: function() {
      // a close button has been clicked
      this.destroyAlert();
    }
  }
});
