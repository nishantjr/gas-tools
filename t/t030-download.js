'use strict'
const tlib       = require('./tlib')(module),
      fs         = require('fs')

const defaults   = require('../lib/defaults'),
      manifestor = require('../lib/manifestor')

tlib.test('gas download', function(t) {
    const scratchDir = tlib.cleanScratchDir()

    const config = manifestor.emptyConfig()
    config.addProject('first', tlib.testDocId, 'first/')
    fs.writeFileSync(
        tlib.scratchFile(defaults.CONFIG_NAME),
        JSON.stringify(config, "", 2))

    const cmd = tlib.spawnInScratchDir(t, '../../../bin/gas download first')
    cmd.stdout.match(/Downloading/)
    cmd.stderr.match('')
    cmd.succeeds()
    cmd.end(() => tlib.testProjectFirstLine(t, 'first/GAScode.js'))
})

