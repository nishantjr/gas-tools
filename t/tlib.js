const
    fs          = require('fs'),
    path        = require('path'),
    mkdirp      = require('mkdirp'),
    rimraf      = require('rimraf'),
    _           = require('lodash')

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
    scratchDir = scratchFile(test_module)
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
}}
