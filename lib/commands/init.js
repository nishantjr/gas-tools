var colors = require('colors');
var mkdirp = require('mkdirp');

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var util = require('../util')
var defaults = require('../defaults');
var manifestor = require('../manifestor');

module.exports = function init(fileId, options) {
  var subdir = options.subdir || defaults.DEFAULT_SUBDIR;

  var config = {
    path: subdir,
    fileId: fileId,
    key: options.key
  };

  var overwritePromise = options.overwrite ?
    Promise.resolve() :
    manifestor.throwIfConfig();

  return overwritePromise
    .then(function() {
      return manifestor.set(config);
    })
    .then(function() {
      return mkdirp(subdir);
    })
    .then(function(config) {
      return manifestor.getExternalFiles(fileId)
    })
    .map(function(file) {
      return manifestor.writeExternalFile(file, subdir)
    })
    .catch(function(err) {
      console.log('Error running init command'.red);
      throw err;
    });
};
