const isAliEnv = require('./index');

isAliEnv().then(function(res) {
  console.log(`is ali env: ${res}`);
});
