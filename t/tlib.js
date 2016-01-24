const
    fs          = require('fs'),
    path        = require('path'),
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

module.exports = (test_module) => { return {
    test:               require('tape'),
    spawn:              require('tape-spawn'),
    testName:           _.partial(testName, test_module),
    testData:           _.partial(testData, test_module),
    readTestData:       readTestData,
}}
