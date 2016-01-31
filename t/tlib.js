'use strict'

const
    fs          = require('fs'),
    path        = require('path'),
    mkdirp      = require('mkdirp'),
    rimraf      = require('rimraf'),
    _           = require('lodash')

/*
 * There's a bug in tape-spawn 1.4.0 that we trigger with a race condition:
 *   https://github.com/maxogden/tape-spawn/pull/12
 * The check for this bug that prevents cmd.fails() being called below when
 * we are using a tape-spawn known to have this bug can be removed when a
 * new version with the bugfix is released. Remember to update the required
 * version of tape-spawn in package.json when you remove this code.
 */
const
    semver = require('semver'),
    tape_spawn_ver = require('tape-spawn/package.json').version,
    tape_spawn_fixed = semver.gt(tape_spawn_ver, '1.4.0')

function testName(test_module) {
    return path.basename(test_module.filename, '.js').split('-')[0]
}

function testData(test_module, p) {
    return path.join(
        path.dirname(test_module.filename), testName(test_module), p)
}

function readTestData(p) {
    return fs.readFileSync(p, { encoding: 'UTF-8' })
}

function scratchFile(test_module, p) {
    const args = [process.cwd(), '.build', 't', testName(test_module)]
        .concat(Array.prototype.slice.call(arguments, 1))
    return path.join.apply(undefined, args)
}

function cleanScratchDir(test_module) {
    const scratchDir = scratchFile(test_module)
    rimraf.sync(scratchDir)
    mkdirp.sync(scratchDir)
    return scratchDir
}

module.exports = (test_module) => { return {
    test:               require('tape'),
    spawn:              require('tape-spawn'),
    testName:           _.partial(testName, test_module),
    testData:           _.partial(testData, test_module),
    readTestData:       readTestData,
    scratchFile:        _.partial(scratchFile, test_module),
    cleanScratchDir:    _.partial(cleanScratchDir, test_module),
    tape_spawn_fixed:   tape_spawn_fixed,
}}
