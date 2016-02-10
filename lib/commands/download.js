'use strict'

const Promise = require('bluebird');
const mkdirpAsync = Promise.promisify(require('mkdirp'));
const fs = Promise.promisifyAll(require('fs'));

const util = require('../util')
const manifestor = require('../manifestor');
const Config = require('../config');

function download(config) {
    return mkdirpAsync(config.path)
        .then(function() {
            return manifestor.getExternalFiles(config.fileId)
        })
        .map(function(file) {
            return writeExternalFile(file, config.path)
        })
}

function command() {
  console.log('Downloading from Google Drive...')

  return Config.read()
    .then(function(config) { return config.getProject() })
    .then(download)
    .catch(function(err) {
      console.log('Error running download command'.red);
      throw err;
    });
}

function writeExternalFile(file, dir) {
  var filename = file.name + util.getFileExtension(file)
  return fs.writeFileAsync(dir + '/' + filename, file.source)
    .catch(function(err) {
      console.log('Could not write file ' + filename);
      throw err;
    })
}

module.exports = {
    command: command,
    factory: download,
}

