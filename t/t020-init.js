'use strict'
const tlib = require('./tlib')(module),
      fs   = require('fs')

const scratchDir = tlib.cleanScratchDir()

tlib.test('gas init', function(t) {
    const cmd = tlib.spawnInScratchDir(t,
        '../../../bin/gas init first --subdir=first ' + tlib.testDocId)
    cmd.stdout.match('')
    cmd.stderr.match('')
    cmd.succeeds()
    cmd.end(() => tlib.testProjectFirstLine(t, 'first/GAScode.js'))
})

tlib.test('gas init: duplicate projectDescription fails', function(t) {
    const cmd = tlib.spawnInScratchDir(t,
        '../../../bin/gas init first --subdir=xxx ' + tlib.testDocId)
        cmd.stderr.match(/first.*already exists/)
    cmd.fails()
    cmd.end()
})

tlib.test('gas init different subdir', function(t) {
    const cmd = tlib.spawnInScratchDir(t,
        '../../../bin/gas init second --subdir=second ' + tlib.testDocId)
    cmd.stdout.match('')
    cmd.stderr.match('')
    cmd.succeeds()
    cmd.end(() => tlib.testProjectFirstLine(t, 'second/GAScode.js'))
})
