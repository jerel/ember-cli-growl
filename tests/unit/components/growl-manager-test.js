import Ember from 'ember';

import {
  test,
  moduleForComponent
} from 'ember-qunit';

moduleForComponent('growl-manager', 'Growl Manager');

test('assert that the element class exists', function() {
  expect(1);

  ok(this.subject().classNames.indexOf('growl-manager') > -1, 'CSS class exists');
});

test('assert that the dismiss action removes the notification', function() {
  expect(2);
  var manager = this.subject(),
      testObject = {name: 'test'};

  manager.set('notifications', [testObject]);
  equal(manager.get('notifications.length'), 1, 'The message is displayed');
  manager._actions.dismiss.call(manager, testObject);
  equal(manager.get('notifications.length'), 0, 'The message has been removed');
});
