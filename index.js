'use strict';

module.exports = {
  name: 'ember-cli-growl',
  included: function(app) {
    this._super.included(app);

    app.import('components/growl-manager.css');
  }
};
