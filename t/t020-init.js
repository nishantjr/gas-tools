'use strict'
const tlib = require('./tlib')(module),
      bluebird = require('bluebird'),
      fs   = bluebird.promisifyAll(require('fs'))

tlib.test('gas init', (t) => {
    // GDrive publicly readable test file made available by <cjs@cynic.net>.
    // (In the long run we should probably create our own test files.)
    const docId = '1CodFWMEXI-5MfzNniEe8Uw8pSi82Iz0uU_jdbUvs2YpAIVmNqb-aH-Xg'

    const scratchDir = tlib.cleanScratchDir()
    const cmd = bluebird.promisifyAll(
        tlib.spawn(t, '../../../bin/gas init ' + docId,
        { cwd: scratchDir, end: false }))
    cmd.stdout.match('')

    const firstLine =
        '// GAScode.gs from node-google-apps-script Public Test GAS Project'
    cmd.endAsync()
       .then(() => fs.readFileAsync(tlib.scratchFile('src/GAScode.js')))
       .then((buffer) => buffer.toString('utf8').split('\n')[0] )
       .then((actualFirstLine) => t.equal(firstLine, actualFirstLine))
       .then(() => {
            const cmd = bluebird.promisifyAll(
                tlib.spawn(t, '../../../bin/gas init --overwrite' + docId,
                { cwd: scratchDir, end: false }))
            cmd.stdout.match('')
            return cmd.endAsync()
        })
       .then(t.end)


})
