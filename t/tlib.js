'use strict'

const
    fs          = require('fs'),
    path        = require('path'),
    mkdirp      = require('mkdirp'),
    rimraf      = require('rimraf'),
    spawn       = require('tape-spawn'),
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
    const scratchDir = scratchFile(test_module)
    rimraf.sync(scratchDir)
    mkdirp.sync(scratchDir)
    return scratchDir
}

function testProjectFirstLine(test_module, t, filePath)
{
    const firstLine =
        '// GAScode.gs from node-google-apps-script Public Test GAS Project'
    const fullPath = scratchFile(test_module, filePath)
    t.assert(fs.existsSync(fullPath), "'" + fullPath + "' exists")
    const buffer = fs.readFileSync(fullPath)
    const actualFirstLine = buffer.toString('utf8').split('\n')[0]
    t.equal(firstLine, actualFirstLine,
        "'" + filePath + "' downloaded correctly")
}

function spawnInScratchDir(test_module, t, cmd) {
    return spawn(t, cmd, { cwd: scratchFile(test_module) })
}


module.exports = (test_module) => { return {
    test:               require('tape'),
    spawn:              spawn,
    testName:           _.partial(testName, test_module),
    testData:           _.partial(testData, test_module),
    readTestData:       readTestData,
    scratchFile:        _.partial(scratchFile, test_module),
    cleanScratchDir:    _.partial(cleanScratchDir, test_module),

    // GDrive publicly readable test file made available by <cjs@cynic.net>.
    // (In the long run we should probably create our own test files.)
    testDocId: '1CodFWMEXI-5MfzNniEe8Uw8pSi82Iz0uU_jdbUvs2YpAIVmNqb-aH-Xg',

    testProjectFirstLine: _.partial(testProjectFirstLine, test_module),
    spawnInScratchDir:    _.partial(spawnInScratchDir, test_module),
}}
