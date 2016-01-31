'use strict'
const tlib = require('./tlib')(module),
      fs   = require('fs')

// GDrive publicly readable test file made available by <cjs@cynic.net>.
// (In the long run we should probably create our own test files.)
const docId = '1CodFWMEXI-5MfzNniEe8Uw8pSi82Iz0uU_jdbUvs2YpAIVmNqb-aH-Xg'

const scratchDir = tlib.cleanScratchDir()

function testProjectFirstLine(t, filePath)
{
    const firstLine =
        '// GAScode.gs from node-google-apps-script Public Test GAS Project'
    const fullPath = tlib.scratchFile(filePath)
    t.assert(fs.existsSync(fullPath), "'" + fullPath + "' exists")
    const buffer = fs.readFileSync(fullPath)
    const actualFirstLine = buffer.toString('utf8').split('\n')[0]
    t.equal(firstLine, actualFirstLine,
        "'" + filePath + "' downloaded correctly")
}

function spawnInScratchDir(t, cmd) {
    return tlib.spawn(t, cmd, { cwd: scratchDir })
}

tlib.test('gas init', function(t) {
    const cmd = spawnInScratchDir(t, '../../../bin/gas init ' + docId)
    cmd.stdout.match('')
    cmd.end(() => testProjectFirstLine(t, 'src/GAScode.js'))
})
