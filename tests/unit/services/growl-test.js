import Ember from 'ember';

import {
  test,
  moduleFor
} from 'ember-qunit';
import Growl from 'dummy/services/growl';

module('Growl Service');

test('growl is an Ember object with a notification array', function() {
  expect(2);

  ok(Growl.create() instanceof Ember.Object);
  ok(Ember.typeOf(Growl.create().get('notifications')) === 'array');
});

test('growl displays the correct type of message for each method', function() {
  expect(9);

  ['error', 'alert', 'info'].forEach(function(type) {
    var growl = Growl.create({notifications: []});
    growl[type]('Uh oh.');
    equal(growl.get('notifications.length'), 1);
    equal(growl.get('notifications.firstObject.content'), 'Uh oh.');
    equal(growl.get('notifications.firstObject.options.type'), type);
  });
});

test('the is{type} computed properties are correct and the messages are in order', function() {
  expect(3);

  var growl = Growl.create({notifications: []});
  growl.error('Uh oh.');
  growl.info('Meh.');
  growl.alert('RUN!');

  ok(growl.get('notifications').objectAt(0).get('isError'), 'isError is true');
  ok(growl.get('notifications').objectAt(1).get('isInfo'), 'isInfo is true');
  ok(growl.get('notifications').objectAt(2).get('isAlert'), 'isAlert is true');
});

test('assert that the notifications are not duplicated if identical', function() {
  expect(2);

  var growl = Growl.create({notifications: []});
  growl.error('NOOOO0000ooooo.....');
  growl.alert('Hi Jerel!');
  equal(growl.get('notifications.length'), 2);
  growl.alert('Hi Jerel!');
  equal(growl.get('notifications.length'), 2);
});

test('assert that default options are present', function() {
  expect(5);
  var growl = Growl.create({notifications: []}),
      options = {
        type: 'error',
        fadeIn: true,
        closeIn: 5000,
        clickToDismiss: false,
        twitch: false
      };

  growl.error('Test');

  for (var key in options) {
    equal(growl.get('notifications.firstObject.options.'+key), options[key]);
  }
});

test('assert that options can be changed from the defaults', function() {
  expect(3);
  var growl = Growl.create({notifications: []});

  growl.info('Hello.', {fadeIn: false, twitch: true});

  equal(growl.get('notifications.firstObject.options.closeIn'), 5000, 'closeIn is still at default setting');
  equal(growl.get('notifications.firstObject.options.fadeIn'), false, 'fadeIn has been set');
  equal(growl.get('notifications.firstObject.options.twitch'), true, 'twitch has been set');
});
