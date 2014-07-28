import Growl from '../services/growl';

export default {
  name: 'growl',
  initialize: function(container, app) {
    Growl.reopenClass({
      container: container
    });

    app.register('growl:main', Growl);
    app.inject('route', 'growl', 'growl:main');
    app.inject('controller', 'growl', 'growl:main');
  }
};
