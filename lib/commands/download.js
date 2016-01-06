'use strict'

const mkdirp = require('mkdirp');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const util = require('../util')
const manifestor = require('../manifestor');

module.exports = function download() {
  console.log('Downloading from Google Drive...')

  var subdir, fileId;

  return manifestor.get()
    .then(function(config) {
      subdir = config.path
      fileId = config.fileId
    })
    .then(function() {
      return mkdirp(subdir);
    })
    .then(function() {
      return manifestor.getExternalFiles(fileId)
    })
    .map(function(file) {
      console.log('Writing ' + file.name + util.getFileExtension(file))
      return writeExternalFile(file, subdir)
    })
    .catch(function(err) {
      console.log('Error running download command'.red);
      throw err;
    });
}

// XXX duplicated function from `command/init.js`
function writeExternalFile(file, dir) {
  var filename = file.name + util.getFileExtension(file)
  return fs.writeFileAsync(dir + '/' + filename, file.source)
    .catch(function(err) {
      console.log('Could not write file ' + filename);
      throw err;
    })
}
