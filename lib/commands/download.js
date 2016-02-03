'use strict'

const mkdirp = require('mkdirp');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const util = require('../util')
const manifestor = require('../manifestor');

module.exports = function download(projectDescription) {
  console.log('Downloading from Google Drive...')

  var subdir, fileId;

  return manifestor.get()
    .then(function(config) {
      const project = config.getProject(projectDescription)
      subdir = project.path
      fileId = project.fileId
    })
    .then(function() {
      return mkdirp(subdir);
    })
    .then(function() {
      return manifestor.getExternalFiles(fileId)
    })
    .map(function(file) {
      console.log('Writing ' + file.name + util.getFileExtension(file))
      return manifestor.writeExternalFile(file, subdir)
    })
    .catch(function(err) {
      console.log('Error running download command'.red);
      throw err;
    });
}

