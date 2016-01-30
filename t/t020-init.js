'use strict'
const tlib = require('./tlib')(module)

tlib.test('pwd', (t) => {
    // GDrive publicly readable test file made available by <cjs@cynic.net>.
    // (In the long run we should probably create our own test files.)
    const docId = '1CodFWMEXI-5MfzNniEe8Uw8pSi82Iz0uU_jdbUvs2YpAIVmNqb-aH-Xg'

    const scratchDir = tlib.cleanScratchDir()
    const cmd = tlib.spawn(t, '../../../bin/gas init ' + docId,
        { cwd: scratchDir } )
    cmd.stdout.match('')
    cmd.end()
})
