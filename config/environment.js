var _ = require('lodash');

var localEnvVars = {
  TITLE:      'join_me',
  SAFE_TITLE: 'join_me'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
