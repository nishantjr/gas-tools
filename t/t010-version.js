'use strict'
const tlib = require('./tlib')(module)

// Smoke test for the command line program.
tlib.test('version', (t) => {
    const
        expected = require('../package.json').version + '\n',
        cmd = tlib.spawn(t, './bin/gapps -V')
    cmd.succeeds()
    cmd.stdout.match(expected)
    cmd.end()
})
