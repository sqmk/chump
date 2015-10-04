'use strict';

module.exports = {
  version:  require('../package.json').version,
  Client:   require('./Client'),
  Group:    require('./Group'),
  Message:  require('./Message'),
  Priority: require('./Priority'),
  Sound:    require('./Sound'),
  User:     require('./User'),
};
