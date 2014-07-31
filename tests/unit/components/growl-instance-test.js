import Ember from 'ember';

import {
  test,
  moduleForComponent
} from 'ember-qunit';

var testNotification = {options: {type: 'error', twitch: true}};

moduleForComponent('growl-instance', 'Growl Instance');

test('assert that the element class exists', function() {
  expect(1);

  ok(this.subject().classNames.indexOf('growl-instance') > -1, 'CSS class exists');
});

test('assert that the notification type is reflected as a classname', function() {
  expect(1);
  var subject = this.subject();

  subject.set('notification', testNotification);
  equal(subject._classStringForProperty('type'), 'error', 'The instance has a class of error');
});

test('assert that the instance will close when clicked', function() {
  expect(2);

  var subject = this.subject();
  subject.sendAction = function(name, value) {
    equal(name, 'action', 'The parent action was called');
  };

  subject.click();

  // now override destroyAlert to make sure it is what called the action
  subject.destroyAlert = function() {
    ok(true, 'The instance was closed');
  };

  subject.click();
});
