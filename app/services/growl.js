import Ember from 'ember';

export default Ember.Object.extend({
  notifications: Ember.A(),
  error: function(context, opts) {
    opts = opts || {};
    opts.type = 'error';
    this._notify.call(this, context, opts);
  },
  alert: function(context, opts) {
    opts = opts || {};
    opts.type = 'alert';
    this._notify.call(this, context, opts);
  },
  info: function(context, opts) {
    opts = opts || {};
    opts.type = 'info';
    this._notify.call(this, context, opts);
  },

  _notify: function(context, opts) {
    // default options
    var options = {
      type: 'error',
      fadeIn: true,
      closeIn: 5000, // automatically close in 5 seconds.
      clickToDismiss: false, // stay open until it receives a click?
      twitch: false
    };

    Ember.merge(options, opts);

    // if the developer passed an identical message then we just update
    // the open notification balloon options
    var existing = this.get('notifications').findBy('content', context);
    if (existing) {
      return;
    }

    var notification = Ember.ObjectProxy.extend({
      // {{notification.content}} for a string or {{notification.foo}} if you
      // pass an object from a route via this.growl.error({foo: 'bar'});
      content: context,
      options: options,
      updated: 0,
      isInfo: function() {
        return options.type === 'info';
      }.property(),
      isAlert: function() {
        return options.type === 'alert';
      }.property(),
      isError: function() {
        return options.type === 'error';
      }.property()
    }).create();

    this.get('notifications').pushObject(notification);
  }
});
