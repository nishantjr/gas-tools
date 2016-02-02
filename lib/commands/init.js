var colors = require('colors');
var mkdirp = require('mkdirp');

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var util = require('../util')
var defaults = require('../defaults');
var manifestor = require('../manifestor');

module.exports = function init(projectDescription, fileId, options) {
  var subdir = options.subdir || defaults.DEFAULT_SUBDIR;

  return manifestor.get()
    .error(e => {
        if (e.code !== 'ENOENT') return false
        return manifestor.emptyConfig()
    })
    .then(config => {
        config.addProject(projectDescription, fileId, subdir)
        return config
    })
    .then(function(config) {
      return manifestor.set(config);
    })
    .then(function(config) {
      return mkdirp(subdir);
    })
    .then(function(config) {
      return manifestor.getExternalFiles(fileId)
    })
    .map(function(file) {
      return writeExternalFile(file, subdir)
    })
    .catch(function(err) {
      console.error(options.name() + ' failed:', err.message.red)
      require('process').exit(1)
    })
};

function writeExternalFile(file, dir) {
  var filename = file.name + util.getFileExtension(file)
  return fs.writeFileAsync(dir + '/' + filename, file.source)
    .catch(function(err) {
      console.log('Could not write file ' + filename);
      throw err;
    })
}
