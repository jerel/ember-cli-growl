import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Main', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('testing that a growl message is added and closes when clicked', function(assert) {
  visit('/');
  andThen(() => {
    $('.info').click();
    assert.equal(find('.growl-instance').length, 1, 'The component\'s element exists');
    $('.growl-instance').click();
    assert.equal(find('.growl-instance').length, 0, 'The info message has closed');
    $('.alert').click();
    assert.equal(find('.growl-instance').length, 1, 'The alert message element exists');
    Ember.run.later(function() {
      assert.equal(find('.growl-instance').length, 0, 'The alert message has closed via timeout');
    }, 6000);
  });
});
